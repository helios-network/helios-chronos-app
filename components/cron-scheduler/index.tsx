"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { useCreateCron, CreateCronParams } from "@/hooks/useCreateCron";
import { Alert } from "@/components/alert";
import { Heading } from "@/components/heading";
import s from "./cron-scheduler.module.scss";

// Template Icon Component
const TemplateIcon = ({ templateId }: { templateId: string }) => {
  const iconProps = {
    width: "48",
    height: "48",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: s.templateIconSvg,
  };

  switch (templateId) {
    case "price-oracle":
      return (
        <svg {...iconProps}>
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3V3h-3z" />
        </svg>
      );
    case "token-rebase":
      return (
        <svg {...iconProps}>
          <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
        </svg>
      );
    case "yield-harvest":
      return (
        <svg {...iconProps}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "custom":
      return (
        <svg {...iconProps}>
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
  }
};

// Pre-built templates for common use cases
const TASK_TEMPLATES = [
  {
    id: "price-oracle",
    name: "Price Oracle Update",
    description: "Automatically update price feeds from external sources",
    icon: "📊",
    category: "DeFi",
    difficulty: "Beginner",
    estimatedCost: "~0.1 HLS/day",
    defaultValues: {
      methodName: "updatePrice",
      frequency: "50", // ~2.5 minutes
      gasLimit: "200000",
      maxGasPrice: "5",
    },
  },
  {
    id: "token-rebase",
    name: "Token Rebase",
    description: "Perform regular token supply adjustments",
    icon: "🔄",
    category: "DeFi",
    difficulty: "Intermediate",
    estimatedCost: "~0.2 HLS/day",
    defaultValues: {
      methodName: "rebase",
      frequency: "1200", // ~1 hour
      gasLimit: "300000",
      maxGasPrice: "8",
    },
  },
  {
    id: "yield-harvest",
    name: "Yield Harvesting",
    description: "Automatically claim and compound yield rewards",
    icon: "🌾",
    category: "DeFi",
    difficulty: "Beginner",
    estimatedCost: "~0.15 HLS/day",
    defaultValues: {
      methodName: "harvest",
      frequency: "2400", // ~2 hours
      gasLimit: "250000",
      maxGasPrice: "6",
    },
  },
  {
    id: "custom",
    name: "Custom Task",
    description: "Create your own automated task",
    icon: "⚙️",
    category: "Custom",
    difficulty: "Advanced",
    estimatedCost: "Variable",
    defaultValues: {
      methodName: "",
      frequency: "100",
      gasLimit: "300000",
      maxGasPrice: "8",
    },
  },
];

type Step = "template" | "configure" | "review" | "deploy";

export const CronScheduler = () => {
  const { createCron, feedback, resetFeedback, isLoading } = useCreateCron();

  const [currentStep, setCurrentStep] = useState<Step>("template");
  const [selectedTemplate, setSelectedTemplate] = useState<
    (typeof TASK_TEMPLATES)[0] | null
  >(null);

  // Form state
  const [contractAddress, setContractAddress] = useState("");
  const [methodName, setMethodName] = useState("");
  const [abiJson, setAbiJson] = useState("");
  const [frequency, setFrequency] = useState("100");
  const [expirationBlocks, setExpirationBlocks] = useState("1000");
  const [gasLimit, setGasLimit] = useState("300000");
  const [maxGasPrice, setMaxGasPrice] = useState("8");
  const [amountToDeposit, setAmountToDeposit] = useState("1");
  const [params, setParams] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleTemplateSelect = (template: (typeof TASK_TEMPLATES)[0]) => {
    setSelectedTemplate(template);
    setMethodName(template.defaultValues.methodName);
    setFrequency(template.defaultValues.frequency);
    setGasLimit(template.defaultValues.gasLimit);
    setMaxGasPrice(template.defaultValues.maxGasPrice);
    setTaskName(template.name);
    setTaskDescription(template.description);
    setCurrentStep("configure");
  };

  const handleSubmit = async () => {
    resetFeedback();

    try {
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

      // Reset form on success
      if (feedback.status === "success") {
        setCurrentStep("template");
        setSelectedTemplate(null);
        // Reset all form fields
        setContractAddress("");
        setMethodName("");
        setAbiJson("");
        setParams("");
        setTaskName("");
        setTaskDescription("");
      }
    } catch (error) {
      console.error("Error scheduling cron:", error);
    }
  };

  const getFrequencyInTime = (blocks: string) => {
    const blockNum = parseInt(blocks);
    const seconds = blockNum * 3; // ~3 seconds per block
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    return `${Math.round(seconds / 86400)} days`;
  };

  const getDurationInTime = (blocks: string) => {
    const blockNum = parseInt(blocks);
    const seconds = blockNum * 3;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    return `${Math.round(seconds / 86400)} days`;
  };

  const estimateDailyCost = () => {
    const blocksPerDay = 28800; // 24 hours * 60 minutes * 20 blocks per minute
    const maintenanceCost = (blocksPerDay * 100 * parseInt(maxGasPrice)) / 1e9; // 100 gas per block
    const executionCost =
      ((blocksPerDay / parseInt(frequency)) *
        parseInt(gasLimit) *
        parseInt(maxGasPrice)) /
      1e9;
    return (maintenanceCost + executionCost).toFixed(4);
  };

  // Step 1: Template Selection
  if (currentStep === "template") {
    return (
      <div className={s.wizardContainer}>
        <Card className={s.templateSelectionCard}>
          <div className={s.templateSelectionHeader}>
            <Heading
              level={2}
              size="medium"
              className={s.templateSelectionTitle}
            >
              Choose Your Automation Template
            </Heading>
            <p className={s.templateSelectionSubtitle}>
              Select a pre-built template or create a custom automated task
            </p>
          </div>

          <div className={s.templateGrid}>
            {TASK_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className={`${s.templateCard} ${
                  template.id === "custom" ? s.customTemplate : ""
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className={s.templateIcon}>
                  <TemplateIcon templateId={template.id} />
                </div>
                <div className={s.templateContent}>
                  <h3 className={s.templateName}>{template.name}</h3>
                  <p className={s.templateDescription}>
                    {template.description}
                  </p>
                  <div className={s.templateMeta}>
                    <span
                      className={`${s.templateDifficulty} ${
                        s[template.difficulty.toLowerCase()]
                      }`}
                    >
                      {template.difficulty}
                    </span>
                    <span className={s.templateCategory}>
                      {template.category}
                    </span>
                  </div>
                  <div className={s.templateCost}>
                    <span className={s.costLabel}>Est. Cost:</span>
                    <span className={s.costValue}>
                      {template.estimatedCost}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className={s.helpSection}>
          <div className={s.helpGrid}>
            <div className={s.helpCard}>
              <div className={s.helpIcon}>
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3>Beginner Friendly</h3>
              <p>
                Start with pre-configured templates that include safe defaults
                and proven automation patterns.
              </p>
            </div>

            <div className={s.helpCard}>
              <div className={s.helpIcon}>
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Battle Tested</h3>
              <p>
                All templates are thoroughly tested and optimized for gas
                efficiency and reliability.
              </p>
            </div>

            <div className={s.helpCard}>
              <div className={s.helpIcon}>
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="currentColor"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3>Documentation</h3>
              <p>
                Comprehensive guides and examples to help you understand and
                customize your automation.
              </p>
              <a
                href="https://hub.helioschain.network/docs/innovate/advanced-use-cases/autonomous-chronos-tasks"
                target="_blank"
                rel="noopener noreferrer"
                className={s.helpLink}
              >
                Read Docs →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Progress Indicator Component
  const ProgressIndicator = ({ currentStep }: { currentStep: Step }) => (
    <div className={s.progressContainer}>
      <div className={s.progressIndicator}>
        <div
          className={`${s.progressStep} ${
            currentStep === "template" ? s.active : s.completed
          }`}
          onClick={() => setCurrentStep("template")}
        >
          <div className={s.stepIcon}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </div>
          <span>Templates</span>
        </div>

        <div
          className={`${s.stepConnector} ${
            currentStep !== "template" ? s.active : ""
          }`}
        />

        <div
          className={`${s.progressStep} ${
            currentStep === "configure"
              ? s.active
              : currentStep === "review" || currentStep === "deploy"
              ? s.completed
              : s.pending
          }`}
          onClick={() =>
            currentStep !== "template" && setCurrentStep("configure")
          }
        >
          <div className={s.stepIcon}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <span>Configure</span>
        </div>

        <div
          className={`${s.stepConnector} ${
            currentStep === "review" || currentStep === "deploy" ? s.active : ""
          }`}
        />

        <div
          className={`${s.progressStep} ${
            currentStep === "review" || currentStep === "deploy"
              ? s.active
              : s.pending
          }`}
        >
          <div className={s.stepIcon}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span>Deploy</span>
        </div>
      </div>
    </div>
  );

  // Step 2: Configuration
  if (currentStep === "configure") {
    return (
      <div className={s.wizardContainer}>
        <div className={s.wizardHeader}>
          <ProgressIndicator currentStep={currentStep} />
          <Heading level={2} size="medium" className={s.wizardTitle}>
            Configure Your {selectedTemplate?.name}
          </Heading>
          <p className={s.wizardSubtitle}>
            Set up the details for your automated task
          </p>
        </div>

        {feedback.message && (
          <Alert
            variant={feedback.status}
            className={s.alert}
            onClose={resetFeedback}
          >
            {feedback.message}
          </Alert>
        )}

        <div className={s.configurationForm}>
          <Card className={s.formSection}>
            <h3 className={s.sectionTitle}>📝 Task Details</h3>

            <div className={s.formGroup}>
              <label htmlFor="taskName" className={s.label}>
                Task Name
              </label>
              <Input
                id="taskName"
                placeholder="My Automated Task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className={s.input}
              />
              <p className={s.hint}>Give your task a memorable name</p>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="taskDescription" className={s.label}>
                Description (Optional)
              </label>
              <Input
                id="taskDescription"
                placeholder="What does this task do?"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className={s.input}
              />
            </div>
          </Card>

          <Card className={s.formSection}>
            <h3 className={s.sectionTitle}>🎯 Target Contract</h3>

            <div className={s.formGroup}>
              <label htmlFor="contractAddress" className={s.label}>
                Smart Contract Address
              </label>
              <Input
                id="contractAddress"
                placeholder="0x1234567890123456789012345678901234567890"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                required
                className={s.input}
              />
              <p className={s.hint}>
                The address of the smart contract you want to automate
              </p>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="methodName" className={s.label}>
                Function Name
              </label>
              <Input
                id="methodName"
                placeholder="updatePrice"
                value={methodName}
                onChange={(e) => setMethodName(e.target.value)}
                required
                className={s.input}
              />
              <p className={s.hint}>The function to call automatically</p>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="params" className={s.label}>
                Function Parameters (Optional)
              </label>
              <Input
                id="params"
                placeholder="param1, param2, param3"
                value={params}
                onChange={(e) => setParams(e.target.value)}
                className={s.input}
              />
              <p className={s.hint}>
                Parameters to pass to the function (comma-separated)
              </p>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="abiJson" className={s.label}>
                Contract ABI
              </label>
              <Textarea
                id="abiJson"
                placeholder='[{"inputs":[],"name":"updatePrice","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
                value={abiJson}
                onChange={(e) => setAbiJson(e.target.value)}
                required
                className={s.textarea}
                rows={4}
              />
              <p className={s.hint}>
                The ABI (Application Binary Interface) of your contract function
              </p>
            </div>
          </Card>

          <Card className={s.formSection}>
            <h3 className={s.sectionTitle}>⏰ Timing & Duration</h3>

            <div className={s.formRow}>
              <div className={s.formGroup}>
                <label htmlFor="frequency" className={s.label}>
                  Run Every
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
                  {frequency && `≈ ${getFrequencyInTime(frequency)}`}
                </p>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="expirationBlocks" className={s.label}>
                  Run For
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
                <p className={s.hint}>
                  {expirationBlocks &&
                    `≈ ${getDurationInTime(expirationBlocks)}`}
                </p>
              </div>
            </div>
          </Card>

          <Card className={s.formSection}>
            <h3 className={s.sectionTitle}>⛽ Gas & Funding</h3>

            <div className={s.formRow}>
              <div className={s.formGroup}>
                <label htmlFor="gasLimit" className={s.label}>
                  Gas Limit
                </label>
                <Input
                  id="gasLimit"
                  type="number"
                  placeholder="300000"
                  value={gasLimit}
                  onChange={(e) => setGasLimit(e.target.value)}
                  required
                  min="21000"
                  className={s.input}
                />
                <p className={s.hint}>Maximum gas per execution</p>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="maxGasPrice" className={s.label}>
                  Max Gas Price (Gwei)
                </label>
                <Input
                  id="maxGasPrice"
                  placeholder="8"
                  value={maxGasPrice}
                  onChange={(e) => setMaxGasPrice(e.target.value)}
                  required
                  className={s.input}
                />
                <p className={s.hint}>Maximum gas price to pay</p>
              </div>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="amountToDeposit" className={s.label}>
                Initial Deposit (HLS)
              </label>
              <Input
                id="amountToDeposit"
                placeholder="1"
                value={amountToDeposit}
                onChange={(e) => setAmountToDeposit(e.target.value)}
                required
                className={s.input}
              />
              <p className={s.hint}>
                Funds to cover gas costs. Est. daily cost: ~
                {estimateDailyCost()} HLS
              </p>
            </div>
          </Card>

          <div className={s.wizardActions}>
            <Button
              variant="outline"
              onClick={() => setCurrentStep("template")}
              className={s.backButton}
            >
              ← Back to Templates
            </Button>
            <Button
              onClick={() => setCurrentStep("review")}
              disabled={!contractAddress || !methodName || !abiJson}
              className={s.nextButton}
            >
              Review & Deploy →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Review & Deploy
  if (currentStep === "review") {
    return (
      <div className={s.wizardContainer}>
        <div className={s.wizardHeader}>
          <ProgressIndicator currentStep={currentStep} />
          <Heading level={2} size="medium" className={s.wizardTitle}>
            Review Your Automated Task
          </Heading>
          <p className={s.wizardSubtitle}>
            Double-check everything before deploying your task
          </p>
        </div>

        {feedback.message && (
          <Alert
            variant={feedback.status}
            className={s.alert}
            onClose={resetFeedback}
          >
            {feedback.message}
          </Alert>
        )}

        <div className={s.reviewContainer}>
          <Card className={s.reviewCard}>
            <h3 className={s.reviewTitle}>📋 Task Summary</h3>
            <div className={s.reviewGrid}>
              <div className={s.reviewItem}>
                <span className={s.reviewLabel}>Task Name:</span>
                <span className={s.reviewValue}>{taskName}</span>
              </div>
              <div className={s.reviewItem}>
                <span className={s.reviewLabel}>Template:</span>
                <span className={s.reviewValue}>{selectedTemplate?.name}</span>
              </div>
              <div className={s.reviewItem}>
                <span className={s.reviewLabel}>Contract:</span>
                <span className={s.reviewValue}>{contractAddress}</span>
              </div>
              <div className={s.reviewItem}>
                <span className={s.reviewLabel}>Function:</span>
                <span className={s.reviewValue}>{methodName}</span>
              </div>
              <div className={s.reviewItem}>
                <span className={s.reviewLabel}>Frequency:</span>
                <span className={s.reviewValue}>
                  Every {getFrequencyInTime(frequency)}
                </span>
              </div>
              <div className={s.reviewItem}>
                <span className={s.reviewLabel}>Duration:</span>
                <span className={s.reviewValue}>
                  {getDurationInTime(expirationBlocks)}
                </span>
              </div>
              <div className={s.reviewItem}>
                <span className={s.reviewLabel}>Initial Deposit:</span>
                <span className={s.reviewValue}>{amountToDeposit} HLS</span>
              </div>
              <div className={s.reviewItem}>
                <span className={s.reviewLabel}>Est. Daily Cost:</span>
                <span className={s.reviewValue}>
                  ~{estimateDailyCost()} HLS
                </span>
              </div>
            </div>
          </Card>

          <Card className={s.costBreakdown}>
            <h3 className={s.reviewTitle}>💰 Cost Breakdown</h3>
            <div className={s.costItems}>
              <div className={s.costItem}>
                <span className={s.costLabel}>
                  Maintenance (100 gas/block):
                </span>
                <span className={s.costValue}>
                  ~{((28800 * 100 * parseInt(maxGasPrice)) / 1e9).toFixed(4)}{" "}
                  HLS/day
                </span>
              </div>
              <div className={s.costItem}>
                <span className={s.costLabel}>Execution costs:</span>
                <span className={s.costValue}>
                  ~
                  {(
                    ((28800 / parseInt(frequency)) *
                      parseInt(gasLimit) *
                      parseInt(maxGasPrice)) /
                    1e9
                  ).toFixed(4)}{" "}
                  HLS/day
                </span>
              </div>
              <div className={s.costTotal}>
                <span className={s.costLabel}>Total estimated:</span>
                <span className={s.costValue}>
                  ~{estimateDailyCost()} HLS/day
                </span>
              </div>
            </div>
            <p className={s.costNote}>
              💡 You can add more funds anytime by sending HLS to your
              task&apos;s wallet address
            </p>
          </Card>

          <Card className={s.warningCard}>
            <h3 className={s.warningTitle}>⚠️ Important Notes</h3>
            <ul className={s.warningList}>
              <li>
                Your task will create a unique wallet address for gas payments
              </li>
              <li>The task will automatically stop when funds run out</li>
              <li>You can cancel anytime to get remaining funds back</li>
              <li>Make sure your contract function is public and callable</li>
            </ul>
          </Card>
        </div>

        <div className={s.wizardActions}>
          <Button
            variant="outline"
            onClick={() => setCurrentStep("configure")}
            className={s.backButton}
          >
            ← Back to Configure
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className={s.deployButton}
          >
            {isLoading ? "Deploying Task..." : "🚀 Deploy Task"}
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
