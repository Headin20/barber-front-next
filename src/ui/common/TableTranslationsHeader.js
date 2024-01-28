import React from 'react';
import {Translation} from "react-i18next";

const TableTranslationsHeader = ({ title }) => <Translation>{t => <span>{t(title)}</span>}</Translation>

export default TableTranslationsHeader;