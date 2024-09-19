const costLookup = [
  { model: 'chatgpt-4', input_token_cost: 0.03, output_token_cost: 0.03 },
  { model: 'chatgpt-40', input_token_cost: 0.06, output_token_cost: 0.05 },
  {
    model: 'gpt-3.5-turbo',
    input_token_cost: 0.0004,
    output_token_cost: 0.0012
  }
]

const calculateCost = (data) => {
  return data.map((entry) => {
    const costInfo = costLookup.find((cost) => cost.model === entry.model)
    if (!costInfo) {
      throw new Error(`Cost information not found for model: ${entry.model}`)
    }
    const inputCost = ((entry.totalInputTokens * costInfo.input_token_cost) / 1000)
    const outputCost =
      ((entry.totalOutputTokens * costInfo.output_token_cost) / 1000)
    const totalCost = inputCost + outputCost
    return {
      ...entry,
      inputCost: parseFloat(inputCost.toFixed(3)),
      outputCost: parseFloat(outputCost.toFixed(3)),
      cost: parseFloat(totalCost.toFixed(3))
    }
  })
}

export { calculateCost }
