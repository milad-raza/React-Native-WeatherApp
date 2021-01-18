export async function weatherApi(input){
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=90bd830ad4a255676d12894e22a19368&units=metric`
    try {
        let res = await fetch(url);
        // return await res.json();
        const data = await res.json()
        const weather = {
            city: data.name,
            country: data.sys.country,
            temprature: data.main.temp,
            status: 
            data.weather.map((val)=>{
                return(val.main)
             }).toString(),
            icon: 
            data.weather.map((val)=>{
                return(val.icon)
             }).toString()
        }
        return weather;
    } catch (error) {
        console.log(error);
    }
}