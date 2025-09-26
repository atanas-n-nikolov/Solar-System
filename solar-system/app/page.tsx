import Eclipse from '@/components/eclipse/Eclipse';
import Fact from '@/components/fact/Fact';
import PlanetsCarousel from '@/components/planets/PlanetsCarousel';
import { getEclipse } from '@/lib/eclipse';
import getFactOfTheDay from '@/lib/fact';
import { getPlanets } from '@/lib/planets';

export default async function Home() {
  const planets = await getPlanets();
  const factData = await getFactOfTheDay();
  const eclipse = await getEclipse();
  return (
    <>
      <PlanetsCarousel planets={planets} />
      <div className='flex flex-col gap-20'>
        <Fact fact={factData.fact} />
        <Eclipse eclipse={eclipse} />
      </div>
    </>
  );
}
