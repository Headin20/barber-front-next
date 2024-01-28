import React from 'react';
import PropTypes from "prop-types";

import {ReactComponent as Delete} from "./ic-delete.svg";
import {ReactComponent as Add} from "./ic-plus-white.svg";
import {ReactComponent as Logo} from "./ic-logo.svg";
import {ReactComponent as Arrow} from "./ic-arrow.svg";
import {ReactComponent as Company} from "./ic-programs-inactive.svg";
import {ReactComponent as Pen} from "./ic-pen.svg";
import {ReactComponent as Stats} from "./ic-stats.svg";
import {ReactComponent as Users} from "./ic-users.svg";
import {ReactComponent as Filter} from "./ic-filter.svg";
import {ReactComponent as Trip} from "./trip.svg";

import useAdaptiveSize from "../../helpers/hooks/useAdaptiveSize";

const iconMap = {
    nodus: Logo,
    delete: Delete,
    add: Add,
    arrow: Arrow,
    company: Company,
    pen: Pen,
    stats: Stats,
    users: Users,
    filter: Filter,
    trip: Trip,
}

const Icon = ({className, icon, ...props}) => {
    let Svg = iconMap[icon] || iconMap["nodus"];
    const svgRef = useAdaptiveSize();

    return <Svg  ref={svgRef} className={className} {...props} />;
};

Icon.propTypes = {
    icon: PropTypes.oneOf([
        'nodus',
        'delete',
        'add',
        'arrow',
        'company',
        'pen',
        'stats',
        'users',
        'filter',
        'trip'
    ]),
}

export default Icon;