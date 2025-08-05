"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { useCreateCron, CreateCronParams } from "@/hooks/useCreateCron";
import { Alert } from "@/components/alert";
import s from "./cron-scheduler.module.scss";

export const CronScheduler = () => {
  const { createCron, feedback, resetFeedback, isLoading } = useCreateCron();

  const [contractAddress, setContractAddress] = useState("");
  const [methodName, setMethodName] = useState("");
  const [abiJson, setAbiJson] = useState("");
  const [frequency, setFrequency] = useState("100");
  const [expirationBlocks, setExpirationBlocks] = useState("1000");
  const [gasLimit, setGasLimit] = useState("1000000");
  const [maxGasPrice, setMaxGasPrice] = useState("10");
  const [amountToDeposit, setAmountToDeposit] = useState("1");
  const [params, setParams] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();

    try {
      // Parse params as array
      const paramsArray = params.trim()
        ? params.split(",").map((p) => p.trim())
        : [];

      const cronParams: CreateCronParams = {
        contractAddress,
        abi: abiJson,
        methodName,
        params: paramsArray,
        frequency: parseInt(frequency),
        expirationBlocks: parseInt(expirationBlocks),
        gasLimit: parseInt(gasLimit),
        maxGasPrice,
        amountToDeposit,
      };

      await createCron(cronParams);
    } catch (error) {
      console.error("Error scheduling cron:", error);
    }
  };

  const handleAbiPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");

    try {
      // Try to parse as JSON to validate
      JSON.parse(pastedText);
      setAbiJson(pastedText);
    } catch (error) {
      console.error("Invalid ABI JSON:", error);
      setAbiJson(pastedText); // Still set it, but it might be invalid
    }
  };

  return (
    <Card className={s.container}>
      <h2 className={s.title}>Schedule Autonomous Task</h2>
      <p className={s.description}>
        Create a new scheduled task that will execute automatically at the
        specified frequency.
      </p>

      {feedback.message && (
        <Alert
          variant={feedback.status}
          className={s.alert}
          onClose={resetFeedback}
        >
          {feedback.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.formGroup}>
          <label htmlFor="contractAddress" className={s.label}>
            Target Contract Address
          </label>
          <Input
            id="contractAddress"
            placeholder="0x..."
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            required
            className={s.input}
          />
          <p className={s.hint}>
            The smart contract address that will be called.
          </p>
        </div>

        <div className={s.formGroup}>
          <label htmlFor="methodName" className={s.label}>
            Method Name
          </label>
          <Input
            id="methodName"
            placeholder="fetchData"
            value={methodName}
            onChange={(e) => setMethodName(e.target.value)}
            required
            className={s.input}
          />
          <p className={s.hint}>The function name to call on the contract.</p>
        </div>

        <div className={s.formGroup}>
          <label htmlFor="abiJson" className={s.label}>
            Contract ABI
          </label>
          <Textarea
            id="abiJson"
            placeholder='[{"inputs":[],"name":"fetchData","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
            value={abiJson}
            onChange={(e) => setAbiJson(e.target.value)}
            onPaste={handleAbiPaste}
            required
            className={s.textarea}
            rows={4}
          />
          <p className={s.hint}>The ABI of the function you want to call.</p>
        </div>

        <div className={s.formGroup}>
          <label htmlFor="params" className={s.label}>
            Parameters (comma separated)
          </label>
          <Input
            id="params"
            placeholder="param1,param2,param3"
            value={params}
            onChange={(e) => setParams(e.target.value)}
            className={s.input}
          />
          <p className={s.hint}>
            Optional: Parameters to pass to the function.
          </p>
        </div>

        <div className={s.formRow}>
          <div className={s.formGroup}>
            <label htmlFor="frequency" className={s.label}>
              Frequency (blocks)
            </label>
            <Input
              id="frequency"
              type="number"
              placeholder="100"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
              min="1"
              className={s.input}
            />
            <p className={s.hint}>
              How often the task will execute (in blocks).
            </p>
          </div>

          <div className={s.formGroup}>
            <label htmlFor="expirationBlocks" className={s.label}>
              Duration (blocks)
            </label>
            <Input
              id="expirationBlocks"
              type="number"
              placeholder="1000"
              value={expirationBlocks}
              onChange={(e) => setExpirationBlocks(e.target.value)}
              required
              min="1"
              className={s.input}
            />
            <p className={s.hint}>How many blocks until the task expires.</p>
          </div>
        </div>

        <div className={s.formRow}>
          <div className={s.formGroup}>
            <label htmlFor="gasLimit" className={s.label}>
              Gas Limit
            </label>
            <Input
              id="gasLimit"
              type="number"
              placeholder="1000000"
              value={gasLimit}
              onChange={(e) => setGasLimit(e.target.value)}
              required
              min="21000"
              className={s.input}
            />
            <p className={s.hint}>Maximum gas for each execution.</p>
          </div>

          <div className={s.formGroup}>
            <label htmlFor="maxGasPrice" className={s.label}>
              Max Gas Price (Gwei)
            </label>
            <Input
              id="maxGasPrice"
              placeholder="10"
              value={maxGasPrice}
              onChange={(e) => setMaxGasPrice(e.target.value)}
              required
              className={s.input}
            />
            <p className={s.hint}>Maximum gas price for executions.</p>
          </div>
        </div>

        <div className={s.formGroup}>
          <label htmlFor="amountToDeposit" className={s.label}>
            Deposit Amount (ETH)
          </label>
          <Input
            id="amountToDeposit"
            placeholder="1"
            value={amountToDeposit}
            onChange={(e) => setAmountToDeposit(e.target.value)}
            required
            className={s.input}
          />
          <p className={s.hint}>Amount to deposit for task executions.</p>
        </div>

        <div className={s.actions}>
          <Button type="submit" disabled={isLoading} className={s.submitButton}>
            {isLoading ? "Scheduling..." : "Schedule Task"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
