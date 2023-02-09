import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import React, { useEffect } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { Route, Routes } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import ArrangementDetails from "./ArrangementDetails"
import ArrangementsList from "./ArrangementsList"
import { getArrangementsAsync } from "./arrangementsSlice"

interface ArrangementsContainerProps {}

const ArrangementsContainer: React.FC<ArrangementsContainerProps> = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const arrangements = useSelector((state: RootState) => state.arrangements.value)
  const status = useSelector((state: RootState) => state.arrangements.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getArrangementsAsync())
  }, [])

  if (status === "loading") {
    return <div>Loading...</div>
  } else if (status === "failed") {
    return <div>Failed!</div>
  }

  return matches ? (
    <div>
      <div>
        <Routes>
          <Route path={"/*"} element={<ArrangementsList arrangements={arrangements} />} />
        </Routes>
      </div>
      <div>
        <Routes>
          <Route path={"/"} element={<ArrangementDetails />} />
          <Route path="/:id" element={<ArrangementDetails />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Routes>
        <Route path="/" element={<ArrangementsList arrangements={arrangements} />} />
        <Route path="/:id" element={<ArrangementDetails />} />
      </Routes>
    </div>
  )

  // return <ArrangementsList arrangements={arrangements} />
}

export default ArrangementsContainer
