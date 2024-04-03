export type Handler = (e: React.FormEvent<HTMLFormElement>) => void
export type HandleSubmit = React.FormEventHandler<HTMLFormElement>
export type UseHandleSubmit = (e?: Handler) => HandleSubmit
