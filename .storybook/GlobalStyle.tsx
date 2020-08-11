import { createGlobalStyle } from "styled-components";

export const GlobalStyleLight = createGlobalStyle`
 .types-table-wrapper {
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular",
    "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  margin: 0;
  }

.types-table {
  border-collapse: collapse;
  border-spacing: 0;
  color: #333333;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 40px;
  margin-left: 1px;
  margin-right: 1px;
}

.types-table-th {
  color: rgba(51, 51, 51, 0.75);
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
}

.types-table-th :first-of-type,
.types-table-th :last-of-type {
  padding-left: 20px;
}

.types-table-body {
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 1px, rgba(0, 0, 0, 0.065) 0 0 0 1px;
  border-radius: 4px;
}

.types-table-tr {
  padding-left: 20px;
  padding-right: 20px;
}

.types-table-td {
  padding: 10px 20px;
}

.types-table-body-tr {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #e6e6e6;
}

.types-table-body-tr div:first-child {
  width: 20%;
  font-weight: bold;
}

.types-table-body-tr code {
  padding-left: 20px;
}

.types-table-title {
  font-size: 32px;
  line-height: 36px;
  margin-bottom: 0.5rem;
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular",
    "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  color: #333333;
  font-weight: 900;
}
`;

export const GlobalStyleDark = createGlobalStyle`
 .types-table-wrapper {
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular",
    "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  margin: 0;
  }

.types-table {
  border-collapse: collapse;
  border-spacing: 0;
  color: #FFFFFF;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 40px;
  margin-left: 1px;
  margin-right: 1px;
}

.types-table-th {
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
}

.types-table-th :first-of-type,
.types-table-th :last-of-type {
  padding-left: 20px;
}

.types-table-body {
  box-shadow: rgba(0,0,0,0.20) 0 2px 5px 1px, rgba(255,255,255,0.15) 0 0 0 1px;
  border-radius: 4px;
}

.types-table-tr {
  padding-left: 20px;
  padding-right: 20px;
}

.types-table-td {
  padding: 10px 20px;
  color: white;
}  

.types-table-body-tr {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: transparent;
}

.types-table-body-tr div:first-child {
  width: 20%;
  font-weight: bold;
}

.types-table-body-tr code {
  padding-left: 20px;
}

.types-table-title {
  font-size: 32px;
  line-height: 36px;
  margin-bottom: 0.5rem;
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular",
    "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  color: white;
  font-weight: 900;
}

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #444;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-section,
.hljs-link {
  color: white;
}

.hljs,
.hljs-subst {
  color: #ddd;
}

.hljs-string,
.hljs-title,
.hljs-name,
.hljs-type,
.hljs-attribute,
.hljs-symbol,
.hljs-bullet,
.hljs-built_in,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: #d88;
}

.hljs-comment,
.hljs-quote,
.hljs-deletion,
.hljs-meta {
  color: #777;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-title,
.hljs-section,
.hljs-doctag,
.hljs-type,
.hljs-name,
.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}
`;
