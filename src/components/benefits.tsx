import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Zap, Heart, Map } from 'lucide-react'
import { Meteors } from './ui/meteors'
import { MotionDiv } from './motion'

const benefits = [
  {
    title: 'Prime Locations',
    description: 'Our apartments are situated in the most desirable neighborhoods.',
    icon: Map,
  },
  {
    title: 'Top-notch Security',
    description: '24/7 security systems and personnel for your peace of mind.',
    icon: Shield,
  },
  {
    title: 'Energy Efficient',
    description: 'Eco-friendly appliances and systems to reduce your carbon footprint.',
    icon: Zap,
  },
  {
    title: 'Community Events',
    description: 'Regular social events to help you connect with your neighbors.',
    icon: Heart,
  },
]


export function Benefits() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative w-full">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl opacity-20" />
                <Card className="relative shadow-xl bg-gray-900/50 border border-gray-800 overflow-hidden">
                  <CardHeader className="space-y-1">
                    <div className="h-12 w-12 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                      {<benefit.icon className="h-6 w-6 text-gray-300" />}
                    </div>
                    <CardTitle className="text-xl font-bold text-white">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{benefit.description}</p>
                  </CardContent>
                  <Meteors number={10} />
                </Card>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
