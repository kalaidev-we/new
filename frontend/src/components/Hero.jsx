import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const Hero = () => {
  return (
    <div className="h-[400px] w-full bg-gray-900 relative flex items-center justify-center overflow-hidden shadow-inner">
      <div className="absolute z-10 text-center pointer-events-none px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
          Next-Gen <span className="text-blue-500">Commerce</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-md">
          Discover premium products with our interactive 3D catalogue experience. Built for speed and elegance.
        </p>
      </div>
      <Canvas className="absolute inset-0 z-0">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Sphere visible args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial color="#2563eb" attach="material" distort={0.6} speed={1.5} roughness={0.2} metalness={0.8} />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
};

export default Hero;
