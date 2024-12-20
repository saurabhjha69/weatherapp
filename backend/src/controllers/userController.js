import { SearchHistory } from "../models/search.js";
export const handleWeatherCheck = async (req,res) => {
  
  try {
        const {city} = req.body
          const url =
            `https://api.weatherstack.com/current?access_key=${process.env.API_ACCESSKEY}&query=${city}`;
          const options = {
            method: "GET",
          };
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        if(result.success === false){
          return res.status(400).json(result)
        }
        await SearchHistory.create({
          userId: req.user.id,
          searchData: result
      })
    
        return res.status(200).json({success: true, data: result})
      } catch (error) {
        console.error(error)
        return res.status(400).json({success: false,message: "Failed to Get The Weatherconditon",error: error.message || "Something went wrong"})
      }
}

export const handleAllHistory = async (req,res) => {
    try {
        const AllSearchHistory = await SearchHistory.findAll({
            userId: req.user.id
        })

        const history = AllSearchHistory.map((his)=> 
          his.searchData
        )

        return res.status(200).json({success: true, history: history})
    } catch (error) {
        console.error(message)
        return res.status(400).json({success:false, message: "Failed to search"})
    }
}