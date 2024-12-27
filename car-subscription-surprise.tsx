"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Fuel, Gauge, Users, Tag, Calendar, Clock } from 'lucide-react'

const carCategories = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Family SUV",
    description: "Spacious SUVs perfect for family adventures",
    priceRange: "from €399/month",
    specs: {
      seats: "5-7 seats",
      fuel: "Hybrid/Electric",
      type: "SUV"
    },
    image: "/placeholder.svg?height=200&width=400",
    possibleModels: [
      { name: "Jeep Compass", image: "/placeholder.svg?height=100&width=200" },
      { name: "Nissan Qashqai", image: "/placeholder.svg?height=100&width=200" },
      { name: "Skoda Enyaq", image: "/placeholder.svg?height=100&width=200" }
    ]
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: "City Compact",
    description: "Nimble cars ideal for urban driving",
    priceRange: "from €279/month",
    specs: {
      seats: "4-5 seats",
      fuel: "Petrol/Electric",
      type: "Compact"
    },
    image: "/placeholder.svg?height=200&width=400",
    possibleModels: [
      { name: "VW ID.3", image: "/placeholder.svg?height=100&width=200" },
      { name: "Peugeot e-208", image: "/placeholder.svg?height=100&width=200" },
      { name: "Mini Cooper", image: "/placeholder.svg?height=100&width=200" }
    ]
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "Premium Sport",
    description: "High-performance luxury vehicles",
    priceRange: "from €599/month",
    specs: {
      seats: "4-5 seats",
      fuel: "Petrol",
      type: "Sports"
    },
    image: "/placeholder.svg?height=200&width=400",
    possibleModels: [
      { name: "Cupra Formentor", image: "/placeholder.svg?height=100&width=200" },
      { name: "BMW M135i", image: "/placeholder.svg?height=100&width=200" },
      { name: "Mercedes-AMG A35", image: "/placeholder.svg?height=100&width=200" }
    ]
  }
]

const deliveryMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const subscriptionTerms = [
  { value: "3", label: "3 months" },
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
  { value: "24", label: "24 months" }
]

export default function CarSubscriptionSteps() {
  const [step, setStep] = useState(1)
  const [deliveryMonth, setDeliveryMonth] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [subscriptionTerm, setSubscriptionTerm] = useState("")
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const isStepComplete = () => {
    switch (step) {
      case 1: return deliveryMonth !== ""
      case 2: return selectedCategory !== ""
      case 3: return subscriptionTerm !== ""
      default: return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Subscribe to Your Surprise Car</h1>
          <p className="text-lg text-muted-foreground">
            Follow these 3 simple steps to get your perfect car subscription
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                {i < 3 && <div className={`h-1 w-full ${step > i ? 'bg-primary' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 1: Choose Your Delivery Month</h2>
              <Select value={deliveryMonth} onValueChange={setDeliveryMonth}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select delivery month" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryMonths.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 2: Choose Your Car Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carCategories.map((category, index) => (
                  <Card 
                    key={index} 
                    className={`group hover:shadow-lg transition-shadow duration-200 cursor-pointer ${
                      selectedCategory === category.title ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.title)}
                    onMouseEnter={() => setHoveredCategory(index)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <CardHeader className="relative h-[200px] p-0 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.title}
                        className={`object-cover transition-transform duration-500 ${
                          hoveredCategory === index ? 'scale-110 opacity-20' : ''
                        }`}
                        fill
                      />
                      {hoveredCategory === index && (
                        <div className="absolute inset-0 p-4">
                          <div className="text-sm font-medium mb-2">Possible Models:</div>
                          <div className="grid grid-cols-2 gap-2">
                            {category.possibleModels.map((model, modelIndex) => (
                              <div key={modelIndex} className="relative aspect-video">
                                <Image
                                  src={model.image}
                                  alt={model.name}
                                  className="object-cover rounded-md"
                                  fill
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 rounded-b-md">
                                  {model.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {category.icon}
                        <CardTitle>{category.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{category.specs.seats}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="w-4 h-4" />
                          <span>{category.specs.fuel}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Car className="w-4 h-4" />
                          <span>{category.specs.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span className="font-semibold">{category.priceRange}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 3: Choose Your Subscription Term</h2>
              <Select value={subscriptionTerm} onValueChange={setSubscriptionTerm}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select subscription term" />
                </SelectTrigger>
                <SelectContent>
                  {subscriptionTerms.map((term) => (
                    <SelectItem key={term.value} value={term.value}>{term.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
            )}
            <div className="ml-auto">
              {step < 3 ? (
                <Button onClick={handleNext} disabled={!isStepComplete()}>
                  Next
                </Button>
              ) : (
                <Button onClick={() => console.log('Subscription completed')} disabled={!isStepComplete()}>
                  Complete Subscription
                </Button>
              )}
            </div>
          </div>

          {step === 3 && isStepComplete() && (
            <div className="mt-8 p-4 bg-green-100 rounded-md">
              <h3 className="text-xl font-semibold mb-2">Your Subscription Summary</h3>
              <p><Calendar className="inline mr-2" />Delivery Month: {deliveryMonth}</p>
              <p><Car className="inline mr-2" />Car Category: {selectedCategory}</p>
              <p><Clock className="inline mr-2" />Subscription Term: {subscriptionTerms.find(t => t.value === subscriptionTerm)?.label}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

