import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const hash = crypto.createHash('sha512');
    const data = new Date().getTime().toString();
    const hashData = hash.update(`${data}${process.env.SECRET_KEY}`, 'utf-8');
    const key = hashData.digest('hex');

    const res = await fetch(`${process.env.BMS_HOST}?data=${data}&key=${key}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = await res.json();
    let ozone, pm25, pm10, temperature;
    for (const row of response) {
        switch (row.point_name) {
            case 'OUTDOOR-OZONE':
                ozone = Number.parseFloat(row.present_value);
                break;
            case 'OUTDOOR-PM2_5':
                pm25 = Number.parseFloat(row.present_value);
                break;
            case 'OUTDOOR-PM10':
                pm10 = Number.parseFloat(row.present_value);
                break;
            case 'OUTDOOR-TEMPERATURE':
                temperature = Number.parseFloat(row.present_value);
                break;
        }
    }

    return Response.json({
        ozone,
        pm25,
        pm10,
        temperature,
        data,
    });
}
