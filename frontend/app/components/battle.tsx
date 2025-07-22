"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";

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
  const highLight = (text: string) => {
    if (text.includes("fainted")) {
      return <span className="text-red-500  font-bold">{text}</span>;
    }
    if (text.includes("wins the battle")) {
      return <span className="text-green-500 font-bold">{text}</span>;
    }
  };
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
          <div className="mt-4 mb-4">
            {logs.map((log, index) => {
              const isRound = log.match(/^(Round \d+:)(.*)$/);
              return (
                <div key={index} className="mb-1">
                  {isRound ? (
                    <>
                      <div className="text-gray-800  font-bold">
                        {isRound[1]}
                      </div>
                      <div>{isRound[2]}</div>
                    </>
                  ) : (
                    <div>
                      {highLight(log) || (
                        <div className="text-gray-700">{log}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
