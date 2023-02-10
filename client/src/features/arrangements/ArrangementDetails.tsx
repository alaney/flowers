import { Typography } from "@mui/material"
import Divider from "@mui/material/Divider"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../../app/store"
import { Arrangement } from "../../types/Arrangement"
import Flowers from "../flowers/FlowersContainer"
import HardGoods from "./HardGoods"

interface ArrangementDetailsProps {}

const ArrangementDetails: React.FC<ArrangementDetailsProps> = () => {
  let { id } = useParams()
  const arrangements = useSelector((state: RootState) => state.arrangements.value)
  const [arrangement, setArrangement] = useState<Arrangement | undefined>(undefined)

  useEffect(() => {
    setArrangement(arrangements.find((a) => a.id === Number(id)))
  }, [id, arrangements])

  if (!arrangement) return null

  return (
    <>
      <Typography variant="h5" component="h1" marginBottom={2}>
        {arrangement.name}
      </Typography>
      <Typography variant="h6" component="h2">
        Hard Goods
      </Typography>
      <Divider />
      <div style={{ margin: "16px 0" }}>
        <HardGoods arrangement={arrangement} />
      </div>
      <Typography variant="h6" component="h2">
        Flowers
      </Typography>
      <Divider />
      <div style={{ margin: "16px 0" }}>
        <Flowers flowers={arrangement.flowers} />
      </div>
    </>
  )
}

export default ArrangementDetails
