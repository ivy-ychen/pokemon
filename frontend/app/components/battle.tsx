import { Button, Dialog, Flex, Text } from "@radix-ui/themes";

export default function Battle({
  battle,
  logs,
  isOpen,
  setIsOpen,
}: {
  battle: () => void;
  logs: string[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <>
      <div className="flex  justify-center my-6">
        <Button size="3" color="blue" onClick={battle}>
          Battles
        </Button>
      </div>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content>
          <Dialog.Title>Battle Log</Dialog.Title>
          <Dialog.Description>
            {logs.map((log, index) => (
              <div key={index}>
                <Text size="2" className="mb-1">
                  {log}
                </Text>
              </div>
            ))}
          </Dialog.Description>
          <Flex justify="end">
            <Button onClick={() => setIsOpen(false)} className="mt-4 ">
              Close
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
