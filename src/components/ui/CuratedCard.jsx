import { getMediaUrl } from '@/utils/media';

export default function CuratedCard({ item, darkMode, }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        console.log("FULL ITEM:", item)
        // console.log("route from cms",item?.route);

        if (item?.route) {
          router.push(item.route.trim());
        }
      }}
      className={`flex-shrink-0 w-full snap-center rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105
        ${darkMode ? 'bg-zinc-800' : 'bg-white'}
        shadow-lg hover:shadow-2xl`}
    >
      <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
        <img
          src={getMediaUrl(item.image)}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <h3 className="font-bold text-white text-sm md:text-lg mb-1">{item.title}</h3>
        </div>
      </div>
      <div className="mt-auto">

      </div>

    </div>
  );
}