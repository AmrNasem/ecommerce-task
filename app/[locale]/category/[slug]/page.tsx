async function page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  return (
    <div>
      <h1>Category: {slug}</h1>
    </div>
  )
}

export default page