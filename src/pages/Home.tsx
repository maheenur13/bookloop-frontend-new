import Books from '@/components/Books';

export default function Home() {
  return (
    <>
      <Books dataShow={10} page="home" />
    </>
  );
}
