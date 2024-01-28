import React, {useMemo} from 'react';
import ReactDropdown from "react-dropdown";
import Select from "react-dropdown-select";
import 'react-dropdown/style.css';

import styles from './index.module.css'
import Icon from "../Icon";
import {joinClassNames, noOperations} from "../../helpers/utils";
import {Button} from "../index";
import {Translation, useTranslation} from "react-i18next";

const translateOptionsLabel = options => options.map(({ value, label }) => ({ value, label: <Translation>{t => <span>{t(label)}</span>}</Translation>}))

const Dropdown = (
    {
        options = [],
        value = undefined,
        placeholder,
        className,
        controlClassName,
        menuClassName,
        onChange,
    }
) => {
    return (
        <ReactDropdown
            options={translateOptionsLabel(options)}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            controlClassName={controlClassName}
            menuClassName={menuClassName}
            arrowClosed={<Icon icon='arrow' className={styles.arrow}/>}
            arrowOpen={<Icon icon='arrow' className={joinClassNames(styles.arrow, styles.arrow__is_open)}/>}
        />
    );
};

const CustomSelectedValues = ({ props, state }) => {
    const {t} = useTranslation();

    return <div>
        {state?.values?.length} {t('OF')} {props?.options?.length} {t('SELECTED')}
    </div>
}

const CustomDropdownRenderer = ({ props, state, methods }) => {
    const regexp = useMemo(() => new RegExp(state.search, 'i'), [state.search]);
    const {t} = useTranslation();
    return (
        <div className='w-full p-2'>
            <div className='flex flex-col'>
                <div className='flex justify-between'>
                    {!!state?.values.length && <Button color='link' onClick={methods.clearAll}>{t("CLEAR_ALL")}</Button>}
                    {!methods.areAllSelected() && <Button color='link' onClick={methods.selectAll}>{t("SELECT_ALL")}</Button>}
                </div>
                <input
                    className='mt-2 px-1 outline-0 border-slate-300 border rounded-md'
                    value={state.search}
                    onChange={methods.setSearch}
                    placeholder={t("SEARCH")}
                />
            </div>
            <div className={styles.items__dropdown}>
                {props.options
                    .filter((item) => regexp.test(item[props.searchBy] || item[props.labelField]))
                    .map((option) => {
                        if (!props.keepSelectedInList && methods.isSelected(option)) {
                            return null;
                        }

                        return (
                            <label
                                htmlFor={option[props.valueField]}
                                className='flex m-2 align-baseline'
                                key={option[props.valueField]}
                            >
                                <input
                                    type="checkbox"
                                    id={option[props.valueField]}
                                    disabled={option.disabled}
                                    onChange={() => (option.disabled ? undefined : methods.addItem(option))}
                                    checked={state.values.indexOf(option) !== -1}
                                />
                                <div className='mx-3 truncate'>{option[props.labelField]}</div>
                            </label>
                        );
                    })}
            </div>
        </div>
    )
}

export const DropdownMulti = ({ options = [], className, onChange = noOperations }) => {

    return (
            <Select
                className={joinClassNames(styles.react__dropdown__select, className)}
                contentRenderer={CustomSelectedValues}
                dropdownRenderer={CustomDropdownRenderer}
                multi
                options={options}
                onChange={onChange}
                values={[]}
            />
    )
}

export default Dropdown;