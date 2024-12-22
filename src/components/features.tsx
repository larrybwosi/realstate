import { Building2, Shield, Wifi, Dumbbell, Car, TreesIcon as Tree } from 'lucide-react'

const features = [
  {
    name: 'Modern Design',
    description: 'Contemporary architecture with premium finishes',
    icon: Building2,
  },
  {
    name: '24/7 Security',
    description: 'Round-the-clock security and surveillance',
    icon: Shield,
  },
  {
    name: 'High-Speed Internet',
    description: 'Fiber optic internet included',
    icon: Wifi,
  },
  {
    name: 'Fitness Center',
    description: 'State-of-the-art fitness equipment',
    icon: Dumbbell,
  },
  {
    name: 'Covered Parking',
    description: 'Reserved parking spots for residents',
    icon: Car,
  },
  {
    name: 'Green Spaces',
    description: 'Beautifully landscaped outdoor areas',
    icon: Tree,
  },
]

export function Features() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our apartments come with premium amenities and features designed for
            modern living.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

