import React, {useCallback, useEffect, useState} from 'react';
import styles from './common.module.css';
import {joinClassNames} from "../../helpers/utils";

const Modal = ({ isOpen, toggle, className, children }) => {
    const [isRendered, setIsRendered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const renderCallback = useCallback(() => {
        if ( isOpen ) {
            setIsRendered(true);
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, 10);
            document.body.classList.add('modal-open');
            return () => clearTimeout(timer);
        }
        setIsAnimating(false);
        const timer = setTimeout(() => {
            setIsRendered(false);
        }, 500);
        document.body.classList.remove('modal-open');
        return () => clearTimeout(timer);
    }, [isOpen])

    useEffect(renderCallback, [renderCallback]);

    if (!isRendered) {
        return null
    }

    return (
        <article
            className={joinClassNames(styles.modal__overlay, isAnimating && styles.modal__overlay__open)}
            onClick={event => {event.stopPropagation(); toggle()}}
        >
            <section
                className={joinClassNames(styles.modal, className, isAnimating && styles.modal__open)}
                onClick={event => event.stopPropagation()}
            >
                <button className={styles.modal__close__button} onClick={toggle} type='button'>
                    ✖
                </button>
                <section>{children}</section>
            </section>
        </article>
    );
};

export default Modal;