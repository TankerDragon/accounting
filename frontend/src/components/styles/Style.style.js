import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const Style = {
  Nav: styled.div`
    background: #fff;
    position: fixed;
    left: 0;
    width: 220px;
    height: 100vh;
    color: #1d1d1d;
    z-index: 2;
    box-shadow: 0px 0px 7px 0px #b3b3b3;

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0 30px 0;
    }

    h3 {
      font-size: 1rem;
      font-weight: bolder;
      margin: 25px 0 10px 15px;
    }
  `,

  Container: styled.div`
    background: #fff;
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 50px;
    margin-bottom: 30px;
    min-height: 80vh;
    border-radius: 20px;
    padding: 20px;
    z-index: 2;
    box-shadow: 0px 0px 7px 0px #b3b3b3;
  `,

  Row: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 1.5rem;
      color: #1d1d1d;
    }
  `,

  Buttons: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;

    div {
      width: 290px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    button {
      cursor: pointer;
      width: 135px;
      padding: 8px 0;
      border: 1px solid #4b4b4b;
      border-radius: 5px;
    }
  `,

  InputField: styled.div`
    margin-top: 30px;
    width: 300px;

    label {
      color: #4b4b4b;
      display: block;
      font-size: 0.9rem;
      margin-bottom: 5px;
    }
    input,
    select {
      outline: none;
      width: 100%;
      font-size: 1rem;
      padding: 7px 10px;
      border-radius: 20px;
      border: 1px solid #4b4b4b;
    }
    select {
      width: 100%;
    }
  `,

  SLink: styled(NavLink)`
    padding: 10px 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #1d1d1d;
    transition: 0.5s ease;

    svg {
      font-size: 1.2rem;
      margin-right: 10px;
    }
    :hover {
      cursor: pointer;
      background: #fc6c19;
      color: white;
      border-left: 5px solid black;
    }
    &.active {
      background: #fc6c19;
      color: white;
      border-left: 5px solid black;
    }
  `,

  SButton: styled(Link)`
    padding: 12px 18px;
    background: #fc6c19;
    box-shadow: 0px 0px 7px 0px #b3b3b3;
    border-radius: 20px;
    text-decoration: none;
    font-size: 0.9rem;
    color: white;
    transition: 0.3s ease;
    font-weight: bold;
    &:hover {
      transform: translateY(-5px);
    }
  `,

  STable: styled.table`
    width: 100%;
    border-collapse: collapse;
    padding: 0px;
    margin-top: 40px;

    td,
    th {
      border: 1px solid #1d1d1d;
      padding: 8px 10px;
    }
    tr:hover {
      background: lightblue;
    }
    .android {
      color: green;
      svg {
        margin-right: 7px;
      }
    }
    .actions {
      .pen,
      .cross {
        cursor: pointer;
      }
      .pen {
        color: #c49234;
        margin-right: 25px;
      }
      .cross {
        color: #c43f3f;
      }
    }
  `,

  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
    padding: 0px;
    margin-top: 40px;

    td,
    th {
      padding: 8px 10px;
      text-align: left;
    }
    th {
      border-bottom: 2px solid black;
    }
    tbody tr {
      transition: 0.4s ease;
    }
    tbody tr td {
      white-space: nowrap;
    }
    tbody tr:hover {
      background: #e3e3e3;
    }
    a {
      width: 100%;
      display: block;
      text-decoration: none;
      color: black;
    }
    .actions {
      width: 130px;
      height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 0.6;
      transition: 0.3s ease;
      .icon-holder {
        position: relative;
        width: 27px;
        height: 27px;
        background-color: rgb(77, 77, 77);
        border-radius: 50%;
        cursor: pointer;
        .icon {
          font-size: 1.3rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .icon-holder:active {
        background-color: gray;
      }

      .dollar {
        color: rgb(240, 212, 0);
      }
      .clock {
        color: rgb(83, 206, 255);
      }
      .profile {
        color: rgb(33, 221, 13);
      }
      .cross {
        color: rgb(255, 91, 91);
        font-size: 1rem !important;
      }
    }
    tbody tr:hover .actions {
      opacity: 1;
    }
  `,

  Graph: styled.div`
    width: 100%;
    position: relative;

    img {
      width: 100%;
    }
    div {
      border: 1px solid blue;
      position: absolute;
      top: 16%;
      left: 2.75%;
      width: 96.85%;
      height: 83%;
    }
  `,
  BackDrop: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;

    .form {
      position: absolute;
      background: #fff;
      width: 700px;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0px 0px 7px 0px #b3b3b3;
    }
  `,
  LoginContainer: styled.div`
    position: fixed;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    .container {
      box-shadow: 0px 0px 7px 0px #b3b3b3;
      border-radius: 15px;
      padding: 30px;
      padding-bottom: 50px;
    }
  `,
};
