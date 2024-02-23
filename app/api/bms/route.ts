export async function GET(request: Request) {
    const res = await fetch(
        `http://iot.glassbean.com:8181/api?data=12345&key=a7d9be7f7820802d4a0e4c72f645e5d2d67f3b9c8b98904a79518eaf30ea65069f43bfccc942495641ee0acc60805cb3ede5f39f380986c783ea505d4fdc6e06`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
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

    return Response.json({ ozone, pm25, pm10, temperature });
}
