import React from 'react';
import ReactPaginate from "react-paginate";
import {useTranslation} from "react-i18next";

import {usePaginate} from "../../helpers/hooks";
import {joinClassNames, noChanges} from "../../helpers/utils";

import styles from './index.module.css'

const Paginate = ({pageCount = 1, currentPage = 0, onPageChange = noChanges}) => {
    const {t} = useTranslation();

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={t("NEXT")}
            previousLabel={t("PREV")}

            onPageChange={onPageChange}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            forcePage={currentPage}
            renderOnZeroPageCount={null}

            containerClassName={styles.paginate__container}
            pageLinkClassName={styles.paginate__item}
            previousLinkClassName={styles.paginate__item}
            nextLinkClassName={styles.paginate__item}
            breakClassName={styles.break}
            activeLinkClassName={styles.selected}
        />
    );
};

const DefaultPaginate = ({ paginate, loadData, title, subtitle, className }) => {

    const {t} = useTranslation();
    const { currentPage, onPageChange, totalPage, numberFirstCurrenItem, numberLastCurrentItem } = usePaginate(paginate, loadData);

    return totalPage > 0 && (
            <div className={joinClassNames(styles.paginate__wrapper, className)}>
                <div>
                    <span className='font-medium text-lg'>{title}</span>
                    <span className='ml-4'>
                        {`${t("SHOWING")} ${numberFirstCurrenItem} - ${numberLastCurrentItem} ${t("OF")} ${paginate.totalRecords} ${subtitle}`}
                    </span>
                </div>
                <Paginate pageCount={totalPage} onPageChange={onPageChange} currentPage={currentPage}/>
            </div>
        )
}

export default DefaultPaginate;