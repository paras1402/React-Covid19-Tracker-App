import React from "react";
import { sortData } from "../utils/utils";
import styles from "./Table.module.css";
import numeral from "numeral";
function Table({ countries }) {
  //   const content = countries.map((country) => {
  //     return <li>{country.name}</li>;
  //   });
  const list = sortData(countries);

  const content = list.map((country) => {
    return (
      <tr>
        <td>{country.country}</td>
        <td>
          <strong>{numeral(country.cases).format("0,0")}</strong>
        </td>
      </tr>
    );
  });
  return <div className={styles.table}>{content}</div>;
}

export default Table;
