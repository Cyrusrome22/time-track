import { unique } from "joi-browser"
import React from "react"
import { Doughnut } from "react-chartjs-2"
import { useDispatch, useSelector } from "react-redux"
import randomColor from "randomcolor"
import { Text } from "@chakra-ui/react"

const TrackerVisual = (props) => {
  const dataState = useSelector((state) => state.dataReducer)
  const [data, setData] = React.useState({
    datasets: [
      {
        data: [],
      },
    ],
    labels: [],
  })
  const [total, setTotal] = React.useState(0)
  const [stats, setStats] = React.useState({})
  const {} = props

  React.useEffect(() => {
    if (dataState.data.length > 0) {
      buildData(dataState.data)
    } else {
      setData({
        datasets: [
          {
            data: [],
          },
        ],
        labels: [],
      })
      setTotal(0)
    }
  }, [dataState.data])

  const generateStat = () => {
    const statKeys = Object.keys(stats)
    return statKeys.map((stat) => {
      return (
        <Text>
          {`${stat}`} : {stats[stat]}%
        </Text>
      )
    })
  }

  const buildData = (data) => {
    const getAllTags = data.map((data) => data.tag)
    const labels = [...new Set(getAllTags)]
    let sumOfData = []
    for (const label of labels) {
      const all = data.filter((data) => label === data.tag)
      const sum = all.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.number
      }, 0)
      sumOfData.push(sum)
    }
    const generateRandomColor = labels.map((label) => {
      return randomColor()
    })

    setData({
      datasets: [
        {
          data: sumOfData,
          backgroundColor: generateRandomColor,
        },
      ],
      labels: labels,
      backgroundColor: generateRandomColor,
    })
    const total = sumOfData.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    setTotal(total)
    if (total > 0) {
      const statsObject = {}
      let count = 0
      for (const label of labels) {
        const percentage = (sumOfData[count] / total) * 100
        statsObject[label] = percentage.toFixed(2)
        count++
      }
      setStats(statsObject)
    }
  }

  return (
    <React.Fragment>
      <Doughnut data={data} />
      <Text>{total.toFixed(2)} total hrs</Text>
      {total > 0 && generateStat()}
    </React.Fragment>
  )
}

export default TrackerVisual
