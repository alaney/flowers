import React, { useEffect } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import { getArrangementsAsync } from "./arrangementsSlice"

interface ArrangementsProps {}

const Arrangements: React.FC<ArrangementsProps> = () => {
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
  return (
    <div>
      <ul>
        {arrangements.map((a) => (
          <li>{a.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Arrangements
