import { Card, CardContent } from '@/components/ui/custom/card';

export default function InfoCard({ children, className, ...props }) {
  return (
    <Card
      className={`w-full h-fit rounded-[0.625rem] border-2 border-[var(--outline)] ${className}`}
      {...props}
    >
      <CardContent className='w-full'>{children}</CardContent>
    </Card>
  );
}
