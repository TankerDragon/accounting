import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const Style = {
  Nav: styled.div``,

  Container: styled.div``,

  Row: styled.div``,

  Buttons: styled.div``,

  InputField: styled.div``,

  SLink: styled(NavLink)``,

  SAncer: styled.a``,

  SButton: styled(Link)``,

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

  Table: styled.table``,

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
    z-index: 4;

    .form {
      position: fixed;
      background: var(--color-container);
      width: 80%;
      border-radius: 20px;
      padding: 30px;
      left: 50%;
      box-shadow: 0px 0px 7px 0px var(--color-box-shadow);
    }
  `,
  ControlBar: styled.div`
    background: var(--color-container);
    width: calc(100% - 40px);
    margin: auto;
    box-shadow: 0px 0px 7px 0px var(--color-box-shadow);
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    padding: 15px;
  `,
  ModeChanger: styled.div`
    padding: 5px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--color-mode-changer-background);
    color: var(--color-mode-changer-color);
    &:hover {
      cursor: pointer;
    }
    svg {
      font-size: 1.5rem;
    }
  `,
};
