export type ResponseResultModel<TResult> = {
  success: true
  result: TResult
}

export type ResponseErrorModel<TError> = {
  success: false
  error: TError
}
