/**
 * Convert warning obj to array of warnings
 * @param {object} obj
 */
export function weatherWarningParser(obj: any) {
    const warnings = [];
    for (const property in obj) {
        if (!obj[property].code) continue;
        const icon = weatherWarningCodeToIconParser(obj[property].code);
        if (icon === '') continue;
        warnings.push(icon);
    }
    return warnings;
}

const weatherWarningCodeToIconParser = (code: string) => {
    switch (code) {
        case 'WFIREY':
            return 'firey.gif';
        case 'WFIRER':
            return 'firer.gif';
        case 'WFROST':
            return 'frost.gif';
        case 'WHOT':
            return 'vhot.gif';
        case 'WCOLD':
            return 'cold.gif';
        case 'WMSGNL':
            return 'sms.gif';
        case 'WRAINA':
            return 'raina.gif';
        case 'WRAINR':
            return 'rainr.gif';
        case 'WRAINB':
            return 'rainb.gif';
        case 'WFNTSA':
            return 'ntfl.gif';
        case 'WL':
            return 'landslip.gif';
        case 'TC1':
            return 'tc1.gif';
        case 'TC3':
            return 'tc3.gif';
        case 'TC8NE':
            return 'tc8ne.gif';
        case 'TC8SE':
            return 'tc8b.gif';
        case 'TC8NW':
            return 'tc8d.gif';
        case 'TC8SW':
            return 'tc8c.gif';
        case 'TC9':
            return 'tc9.gif';
        case 'TC10':
            return 'tc10.gif';
        case 'WTMW':
            return 'tsunami-warn.gif';
        case 'WTS':
            return 'ts.gif';
        default:
            return '';
    }
};
