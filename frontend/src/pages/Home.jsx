import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/books");
      setBooks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slant-600 rounded-md">No</th>
              <th className="border border-slant-600 rounded-md">Title</th>
              <th className="border border-slant-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slant-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slant-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((data, index) => (
              <tr className="h-8" key={data._id}>
                <td className="border border-slant-600 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slant-600 rounded-md text-center">
                  {data.title}
                </td>
                <td className="border border-slant-600 rounded-md text-center max-md:hidden">
                  {data.author}
                </td>
                <td className="border border-slant-600 rounded-md text-center max-md:hidden">
                  {data.publishYear}
                </td>
                <td className="border border-slant-600 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${data._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/edit/${data._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/books/delete/${data._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
