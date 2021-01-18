export const weatherApi = async (input) => {
    try {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=90bd830ad4a255676d12894e22a19368&units=metric`
        let res = await fetch(url);
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
    } 
    catch (error) {
       const weather = {
           error: "error"
       }
       return weather;
    }
}
