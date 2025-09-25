import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/table';

export function TestImports() {
  return (
    <div>
      <Button>Test</Button>
      <Card>
        <Input placeholder="Test" />
      </Card>
    </div>
  );
}