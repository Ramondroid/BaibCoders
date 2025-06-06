import LoginForm from '@/components/auth/LoginForm';

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
        
        {/* Left side (70%) */}
        <section className="md:w-[60%] w-full flex flex-col justify-center items-start space-y-6">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Welcome to Uina
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl">
            All-in-one academic help desk. From course questions to campus concerns, get real help, real fast — so you can focus on learning
          </p>
        </section>
        <section className="md:w-[30%] w-full flex flex-col items-center justify-center space-y-6"><LoginForm /></section>
      </div>
   </main>
  );
};
