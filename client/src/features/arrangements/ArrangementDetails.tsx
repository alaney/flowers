import { Container, Typography } from "@mui/material"
import Divider from "@mui/material/Divider"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../../app/store"
import { Arrangement } from "../../types/Arrangement"
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
    <Container>
      <Typography variant="h1">{arrangement.name}</Typography>
      <Divider />
      <HardGoods arrangement={arrangement} />
    </Container>
  )
}

export default ArrangementDetails
