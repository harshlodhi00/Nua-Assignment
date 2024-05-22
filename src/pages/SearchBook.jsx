import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSortAlphaUp, FaSortAlphaUpAlt, FaSave } from "react-icons/fa";
import Spinner from "../components/common/Spinner";
import { IoMdDownload } from "react-icons/io";

const SearchBook = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  const [storedBooks, setStoredBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    setStoredBooks(savedBooks);
  }, []);

  const isBookSaved = (bookId) => {
    return storedBooks.some((savedBook) => savedBook.id === bookId);
  };

  const getBooksData = async (searchQuery, pageNo, limit) => {
    setLoading(true);
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${searchQuery}&page=${pageNo}&limit=${limit}`
    );
    const data = await response.json();

    if (data.docs) {
      const newBooks = data.docs.map((bookSingle) => {
        const {
          key,
          author_name,
          cover_i,
          edition_count,
          first_publish_year,
          title,
          subject,
        } = bookSingle;

        return {
          id: key,
          authors: author_name,
          cover_id: cover_i,
          edition_count: edition_count,
          first_publish_year: first_publish_year,
          title: title,
          subject: subject,
        };
      });

      setBooks(newBooks);
      setLoading(false);
    } else {
      setBooks([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getBooksData(searchQuery, pageNo, limit);
    }
  }, [pageNo, limit]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortedBooks = React.useMemo(() => {
    let sortableBooks = [...books];
    if (sortConfig.key !== null) {
      sortableBooks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBooks;
  }, [books, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FaSortAlphaUp />
      ) : (
        <FaSortAlphaUpAlt />
      );
    }

    return <FaSortAlphaUp />;
  };

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Title,Authors,First Publish Year,Subject,Edition Count\n" +
      sortedBooks
        .map(
          (book) =>
            `${book.title},"${book.authors.join(", ")}",${
              book.first_publish_year || ""
            },${book.subject ? book.subject[0] : ""},${
              book.edition_count || ""
            }`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "books.csv");
    document.body.appendChild(link);
    link.click();
  };

  const saveBookToLocal = (book) => {
    let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    if (!savedBooks.some((savedBook) => savedBook.id === book.id)) {
      savedBooks.push(book);
      localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
      setStoredBooks(savedBooks);
    }
  };

  return (
    <>
      <div className="  px-2 sm:px-4 min-h-[90%] bg-[#6ab2f5] bg-opacity-[0.2] m-2 sm:m-4 rounded-lg py-10">
        <div className="flex flex-col items-center justify-between mb-6 ">
          <h1 className="font-[600] mb-4">Search Book</h1>

          <div className="w-[100%] flex flex-row items-center justify-center mb-4 ">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="5 AM Club"
              className="border-l-2 border-t-2 border-b-2 border-gray-500 rounded-s-full px-4 py-2 w-[80%] sm:w-[50%] bg-white focus:outline-none "
            />
            <button
              className="border-2 border-gray-500 p-2 rounded-e-full bg-white "
              onClick={() => getBooksData(searchQuery, pageNo, limit)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getBooksData(searchQuery, pageNo, limit);
                }
              }}
            >
              <IoSearch size={24} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-4 w-full ">
            <Spinner />
          </div>
        ) : (
          <div className="w-[100%] h-[90%] shadow-md rounded-md bg-[#6ab2f5] bg-opacity-[0.2] py-2 px-2">
            <div className="flex flex-row justify-between items-center border-b-[2px] border-[#bababa] px-4 py-2 mb-2">
              <h3 className="font-[600]">All Books</h3>

              <button
                onClick={downloadCSV}
                className="flex flex-row items-center justify-between bg-blue-400 px-3 py-1 rounded-full hover:bg-blue-500 active:bg-blue-400 "
              >
                <span className="font-[500] mr-1">Download CSV </span>
                <IoMdDownload size={20} />
              </button>
            </div>

            <div className="px-4 py-2 flex flex-row justify-between items-center ">
              <div>
                <span className="mr-4 font-[500] text-[14px] sm:text-[18px] ">
                  Show Entries
                </span>
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="border-2 border-[#41ade2] rounded-sm bg-transparent "
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className=" hidden sm:flex flex-row justify-center items-center w-[30%] gap-1">
                <button
                  onClick={() => setPageNo(pageNo - 1)}
                  className={`colorButton ${
                    pageNo === 1 ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={pageNo === 1}
                >
                  Previous
                </button>

                {[...Array(4)].map((_, index) => (
                  <button
                    key={index}
                    className={`colorButton ${
                      pageNo === index + 1
                        ? "!bg-blue-500 !border-blue-500 "
                        : ""
                    }`}
                    onClick={() => setPageNo(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPageNo(pageNo + 1)}
                  className="colorButton"
                >
                  Next
                </button>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="w-[12vw] py-3 px-3 cursor-pointer"
                    onClick={() => requestSort("title")}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <span>Title</span>
                      <span> {getSortIcon("title")}</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="w-[12vw] py-3 px-3 cursor-pointer"
                    onClick={() => requestSort("author_name")}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <span>Author</span>
                      <span> {getSortIcon("author_name")}</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="w-[12vw] py-3 px-3 cursor-pointer"
                    onClick={() => requestSort("first_publish_year")}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <span>First Publish Year</span>
                      <span> {getSortIcon("first_publish_year")}</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="w-[12vw] py-3 px-3 cursor-pointer"
                    onClick={() => requestSort("subject")}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <span>Subject</span>
                      <span> {getSortIcon("subject")}</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="w-[12vw] py-3 px-3 cursor-pointer"
                    onClick={() => requestSort("edition_count")}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <span>Edition Count</span>
                      <span> {getSortIcon("edition_count")}</span>
                    </div>
                  </th>

                  <th scope="col" className="w-[10vw] py-3 px-3 cursor-pointer">
                    <div className="flex flex-row items-center justify-between ">
                      <span>Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedBooks.map((book, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  "
                  >
                    <td className="py-4 px-6">{book.title}</td>

                    <td className="py-4 px-6">
                      {book.authors &&
                        book.authors.map((author, index) => (
                          <span key={index}>
                            {author}
                            {index < (book.author?.length || 0) - 1 ? ", " : ""}
                          </span>
                        ))}
                    </td>

                    <td className="py-4 px-6">{book.first_publish_year}</td>

                    <td className="py-4 px-6">
                      {book.subject && book.subject[0]}
                    </td>

                    <td className="py-4 px-6">{book.edition_count}</td>
                    <td className="py-4 px-6">
                      {isBookSaved(book.id) ? (
                        <span>Saved</span>
                      ) : (
                        <button
                          onClick={() => {
                            saveBookToLocal(book);
                            setStoredBooks((prev) => [...prev, book]);
                          }}
                        >
                          <FaSave size={25} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="h-[50px] text-center md:px-6 ">
        &copy; {new Date().getFullYear()} - Made with ❤️ by{" "}
        <a
          className=" dark:text-blue-600 leading-6 underline hover:text-blue-400 duration-100"
          target="_blank"
          href="https://harshlodhi.netlify.app/"
        >
          Harsh Lodhi
        </a>
      </div>
    </>
  );
};

export default SearchBook;
