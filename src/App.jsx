
import { useState } from 'react'

function App() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')

  const calculateBMI = () => {
    const weightValue = Number(weight)
    const heightValue = Number(height)

    if (!weight || !height) {
      setError('Please enter both weight and height.')
      setBmi(null)
      return
    }

    if (
      !Number.isFinite(weightValue) ||
      !Number.isFinite(heightValue) ||
      weightValue <= 0 ||
      heightValue <= 0
    ) {
      setError('Please enter valid positive values.')
      setBmi(null)
      return
    }

    if (weightValue > 500 || heightValue > 300) {
      setError('Please enter realistic weight and height values.')
      setBmi(null)
      return
    }

    const heightInMeters = heightValue / 100
    const bmiValue = weightValue / (heightInMeters * heightInMeters)

    setBmi(bmiValue.toFixed(1))
    setError('')

    if (bmiValue < 18.5) {
      setCategory('Underweight')
    } else if (bmiValue < 25) {
      setCategory('Normal Weight')
    } else if (bmiValue < 30) {
      setCategory('Overweight')
    } else {
      setCategory('Obese')
    }
  }

  const resetCalculator = () => {
    setWeight('')
    setHeight('')
    setBmi(null)
    setCategory('')
    setError('')
  }

  const categoryColor = {
    Underweight: 'text-sky-700 bg-sky-50',
    'Normal Weight': 'text-green-800 bg-green-100',
    Overweight: 'text-amber-700 bg-amber-50',
    Obese: 'text-red-700 bg-red-50',
  }

  return (
    <div className="min-h-screen bg-[#f3f7f1] flex items-center justify-center px-4 py-8 sm:py-12">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_15px_50px_rgba(49,76,57,0.10)] p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#e8f0e5] flex items-center justify-center text-2xl">
            🌿
          </div>

          <h1 className="text-3xl font-bold text-[#314b3a] tracking-tight">
            BMI Calculator
          </h1>

          <p className="text-[#87978a] text-sm mt-2">
            A simple way to understand your BMI
          </p>

        </div>

        {/* Input Fields */}
        <div className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-[#405b48] mb-2">
              Weight
              <span className="text-[#87978a] font-normal ml-1">(kg)</span>
            </label>

            <input
              type="number"
              min="0"
              step="any"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value)
                setError('')
              }}
              placeholder="Enter your weight"
              className="w-full px-4 py-3 rounded-xl border border-[#dce7dc] outline-none focus:ring-2 focus:ring-[#a4bea5] focus:border-[#789b83]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#405b48] mb-2">
              Height
              <span className="text-[#87978a] font-normal ml-1">(cm)</span>
            </label>

            <input
              type="number"
              min="0"
              step="any"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value)
                setError('')
              }}
              placeholder="Enter your height"
              className="w-full px-4 py-3 rounded-xl border border-[#dce7dc] outline-none focus:ring-2 focus:ring-[#a4bea5] focus:border-[#789b83]"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="space-y-3 pt-2">

            <button
              onClick={calculateBMI}
              className="w-full bg-[#557b60] hover:bg-[#42674e] text-white font-semibold py-3 rounded-xl shadow-sm"
            >
              Calculate BMI
            </button>

            <button
              onClick={resetCalculator}
              className="w-full bg-[#edf3eb] hover:bg-[#e1ebe0] text-[#49644f] font-semibold py-3 rounded-xl"
            >
              Reset
            </button>

          </div>

          {/* BMI Result */}
          {bmi !== null && (
            <div className="mt-6 bg-[#f3f7f1] border border-[#e0eadf] rounded-2xl p-5 text-center">

              <p className="text-sm text-[#718574] font-medium">
                Your BMI
              </p>

              <h2 className="text-5xl font-bold text-[#42674e] mt-2">
                {bmi}
              </h2>

              <span className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${categoryColor[category]}`}>
                {category}
              </span>

              <div className="mt-6 border-t border-[#dce7dc] pt-5">

                <p className="text-sm text-[#718574]">
                  Healthy BMI range
                </p>

                <p className="text-lg font-bold text-[#405b48] mt-1">
                  18.5 – 24.9
                </p>

              </div>

            </div>
          )}

        </div>

        {/* BMI Categories */}
        <div className="mt-8 border-t border-[#edf1eb] pt-6">

          <h3 className="text-lg font-bold text-[#314b3a] mb-5">
            BMI Categories
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between items-center text-sm">
              <span className="text-sky-700 font-medium">
                Underweight
              </span>
              <span className="text-[#87978a]">
                Below 18.5
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-green-800 font-medium">
                Normal Weight
              </span>
              <span className="text-[#87978a]">
                18.5 – 24.9
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-amber-700 font-medium">
                Overweight
              </span>
              <span className="text-[#87978a]">
                25 – 29.9
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-red-700 font-medium">
                Obese
              </span>
              <span className="text-[#87978a]">
                30 or above
              </span>
            </div>

          </div>

        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-[#91a092] mt-7 leading-relaxed">
          BMI is a screening tool, not a medical diagnosis.
          Consult a healthcare professional for personalized advice.
        </p>

      </div>

    </div>
  )
}

export default App
