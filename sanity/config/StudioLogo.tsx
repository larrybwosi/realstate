import Image from 'next/image'

function StudioLogo(props: any) {
  const { renderDefault, title } = props

  return (
    <div className="flex items-center space-x-2">
      <Image
        className="rounded-full object-cover"
        height={50}
        width={50}
        src="/logo.png"
        alt="logo"
      />
      {renderDefault && <>{renderDefault(props)}</>}
    </div>
  )
}

export default StudioLogo

