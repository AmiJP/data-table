import { useState, useEffect } from "react";
import axios from "axios";
import { data } from "../components/db.js";

const SortType = {
  ASC: "ascending",
  DESC: "descending",
};

const FieldsType = {
  Name: "name",
  Company: "company",
  City: "city",
};

export function SearchPage() {
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState(data);
  const [sortType, setSortType] = useState(SortType.ASC);

  useEffect(() => {
    let searchData = data.filter((ele) => {
      if (ele.name.toLowerCase().includes(input.toLowerCase())) return true;
      if (ele.city.toLowerCase().includes(input.toLowerCase())) return true;
      if (ele.company.toLowerCase().includes(input.toLowerCase())) return true;
      if (ele.phone.toLowerCase().includes(input.toLowerCase())) return true;
    });
    setFilterData(searchData);
  }, [input]);

  function handleSort(sortType, field) {
    setSortType(prev => (prev == SortType.ASC)  ?SortType.DESC : SortType.ASC)

    switch (sortType) {
      case SortType.ASC:
        let res = filterData.sort((a, b) => a[field].localeCompare(b[field]));
        setFilterData([...res]);
        break;

      case SortType.DESC:
        let res1 = filterData.sort((a, b) => b[field].localeCompare(a[field]));
        setFilterData([...res1]);
        break;

      default:
        console.log("not defined");
    }
  }

  return (
    <>
      <input
        className="mb-3"
        type="text"
        id="myInput"
        placeholder="Search for names.."
        onChange={(e) => setInput(e.target.value)}
      />
      <table>
        <tr>
          <th onClick={() => handleSort(sortType, "name")}>
            Name {sortType}
          </th>
          <th onClick={() => handleSort(sortType, "company")}>
            Company {sortType}
          </th>
          <th onClick={() => handleSort(sortType, "city")}>
            City {sortType}
          </th>
          <th onClick={() => handleSort(sortType, "phone")}>
            Phone {sortType}
          </th>
        </tr>
        {filterData &&
          filterData.map((ele) => {
            return (
              <tr key={ele.id}>
                <td>{ele.name}</td>
                <td>{ele.company}</td>
                <td>{ele.city}</td>
                <td>{ele.phone}</td>
              </tr>
            );
          })}
      </table>
    </>
  );
}
