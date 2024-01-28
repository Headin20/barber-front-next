import {useEffect, useRef} from "react";

const stringPxToEm = (pxString = "", base = 16) => {
    if (!pxString) {
        return;
    }

    const isRem = /\d+em$/g.test(pxString);

    if (isRem) {
        return pxString;
    } else {
        const pixelsNumber = Number(pxString.replace(/\D/g,''));

        return `${pixelsNumber / base}em`;
    }
}

const  useAdaptiveSize = () => {
    const elementRef = useRef();

    useEffect(() => {
        if (elementRef.current) {
            const currentWidth = elementRef.current.getAttribute('width');
            const currentHeight = elementRef.current.getAttribute('height');

            if (!!currentWidth && !!currentHeight) {
                elementRef.current.setAttribute('width', stringPxToEm(currentWidth));
                elementRef.current.setAttribute('height', stringPxToEm(currentHeight));
            }
        }
    }, [elementRef.current]);

    return elementRef;
}

export default useAdaptiveSize;