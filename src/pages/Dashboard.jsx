import React, { useEffect, useState } from "react";
import { FaSortAlphaUp, FaSortAlphaUpAlt } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({
    index: null,
    title: "",
    authors: [""],
    first_publish_year: "",
    subject: [""],
    edition_count: 0,
  });

  const handleEdit = (index) => {
    const bookToEdit = books[index];
    setEditedBook({
      index,
      title: bookToEdit.title,
      authors: bookToEdit.authors || [""],
      first_publish_year: bookToEdit.first_publish_year,
      subject: bookToEdit.subject || [""],
      edition_count: bookToEdit.edition_count,
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedBooks = [...books];
    updatedBooks[editedBook.index] = {
      title: editedBook.title,
      authors: editedBook.authors,
      first_publish_year: editedBook.first_publish_year,
      subject: editedBook.subject,
      edition_count: editedBook.edition_count,
    };
    setBooks(updatedBooks);
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
    setIsEditing(false);
    setEditedBook({
      index: null,
      title: "",
      authors: [""],
      first_publish_year: "",
      subject: [""],
      edition_count: 0,
    });
  };

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    setBooks(savedBooks);
  }, []);

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

  const handleDelete = (index) => {
    const newBooks = books.filter((_, i) => i !== index);
    setBooks(newBooks);
    localStorage.setItem("savedBooks", JSON.stringify(newBooks));
  };

  const handleEntriesChange = (event) => {
    setBooksPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(books.length / booksPerPage);
  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <>
      <div className="w-full min-h-[95%] p-4">
        <div className="w-[100%] shadow-md rounded-md bg-[#6ab2f5] bg-opacity-[0.2] py-4 px-2">
          <h4 className="font-[600] border-b-[2px] border-[#bababa] px-4 py-2 mb-2">
            All Saved Books
          </h4>

          <div className="px-4 py-2 flex flex-row justify-between items-center">
            <div>
              <span className="mr-4 font-[500] text-[18px]">Show Entries</span>
              <select
                className="border-2 border-[#41ade2] rounded-sm bg-transparent"
                value={booksPerPage}
                onChange={handleEntriesChange}
              >
                <option value={2}>2</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex flex-row justify-center items-center w-[30%] gap-1">
              <button
                className={`colorButton ${
                  currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`colorButton ${
                    currentPage === index + 1
                      ? "!bg-blue-500 !border-blue-500 "
                      : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="colorButton"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
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
                  <div className="flex flex-row items-center justify-between">
                    <span>Action</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((book, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{book.title}</td>

                  <td className="py-4 px-6">
                    {book.authors &&
                      book.authors.map((author, index) => (
                        <span key={index}>
                          {author}
                          {index < (book.authors?.length || 0) - 1 ? ", " : ""}
                        </span>
                      ))}
                  </td>

                  <td className="py-4 px-6">{book.first_publish_year}</td>

                  <td className="py-4 px-6">
                    {book.subject && book.subject[0]}
                  </td>

                  <td className="py-4 px-6">{book.edition_count}</td>

                  <td className="py-4 px-6">
                    <button className="mr-2" onClick={() => handleEdit(index)}>
                      <FaEdit size={25} />
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      <IoMdCloseCircleOutline size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isEditing ? (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h4 className="text-xl font-semibold mb-4">Edit Book</h4>
                <div className="space-y-4 ">
                  <div>
                    <h5 className="font-[500]">Title : </h5>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md"
                      value={editedBook.title}
                      onChange={(e) =>
                        setEditedBook({ ...editedBook, title: e.target.value })
                      }
                      placeholder="Title"
                    />
                  </div>

                  <div>
                    <h5 className="font-[500]">Authors : </h5>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md"
                      value={editedBook.authors.join(", ")}
                      onChange={(e) =>
                        setEditedBook({
                          ...editedBook,
                          authors: e.target.value.split(", "),
                        })
                      }
                      placeholder="Authors"
                    />
                  </div>

                  <div>
                    <h5 className="font-[500]">First Publish Year : </h5>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md"
                      value={editedBook.first_publish_year}
                      onChange={(e) =>
                        setEditedBook({
                          ...editedBook,
                          first_publish_year: e.target.value,
                        })
                      }
                      placeholder="First Publish Year"
                    />
                  </div>

                  <div>
                    <h5 className="font-[500]">Subject : </h5>
                    <textarea
                      type="text"
                      className="w-full px-4 py-2 border rounded-md min-h-[150px]"
                      value={editedBook.subject.join(", ")}
                      onChange={(e) =>
                        setEditedBook({
                          ...editedBook,
                          subject: e.target.value.split(", "),
                        })
                      }
                      placeholder="Subject"
                    />
                  </div>

                  <div>
                    <h5 className="font-[500]">Edition Count : </h5>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border rounded-md"
                      value={editedBook.edition_count}
                      onChange={(e) =>
                        setEditedBook({
                          ...editedBook,
                          edition_count: e.target.value,
                        })
                      }
                      placeholder="Edition Count"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
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

export default Dashboard;
