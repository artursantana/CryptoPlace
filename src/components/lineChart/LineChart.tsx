

import Chart from 'react-google-charts'



import React, { useEffect, useState } from 'react'

const LineChart = ({historicalData}: any) => {


    const [data,setData] = useState([['Date','Prices']])
    

    useEffect(()=> {
        let dataCopy = [['Date','Prices']]
        if(historicalData.prices){

            historicalData.prices.map((e: any)=> {

                dataCopy.push([`${new Date(e[0]).toLocaleDateString().slice(0,-5)}`, e[1]])

            })
            setData(dataCopy)

        }},[historicalData])

  return (
    <Chart 
            chartType='LineChart'
            data={(data)}
            height='100%'
            legendToggle
    />
  )
}

export default LineChart
