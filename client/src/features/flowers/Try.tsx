import { Button, TextField } from "@mui/material"
import cloneDeep from "lodash.clonedeep"
import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch } from "../../app/hooks"
import { Flower } from "../../types/Types"
import { updateFlowerAsync } from "./flowersSlice"

interface TryProps {
  flower: Flower
}

interface FlowerInput {
  name: string
}
const Try: React.FC<TryProps> = ({ flower }) => {
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FlowerInput>({
    defaultValues: {
      name: flower.name,
    },
  })

  const onSubmit: SubmitHandler<FlowerInput> = async (data) => {
    await dispatch(updateFlowerAsync({ ...cloneDeep(flower), ...data }))
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <TextField error={!!errors.name} helperText={errors.name && "Must provide a value"} {...field} />} />
        <Button type="submit">Click</Button>
      </form>
    </div>
  )
}

export default Try
