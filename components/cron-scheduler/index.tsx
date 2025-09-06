"use client";

import { useState } from "react";
import Image from "next/image";
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
  switch (templateId) {
    case "price-oracle":
      return (
        <div className={s.templateIconContainer}>
          <div className={s.gridIconWrapper}>
            <div className={s.gridSquare}></div>
            <div className={s.gridSquare}></div>
            <div className={s.gridSquare}></div>
            <div className={s.gridSquare}></div>
          </div>
        </div>
      );
    case "token-rebase":
      return (
        <div className={s.templateIconContainer}>
          <svg
            width="27"
            height="28"
            viewBox="0 0 27 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.923 8.06597C12.9846 7.96865 13.0699 7.88849 13.1709 7.83295C13.2719 7.77741 13.3852 7.74829 13.5005 7.74829C13.6157 7.74829 13.729 7.77741 13.83 7.83295C13.931 7.88849 14.0163 7.96865 14.078 8.06597L14.8555 9.28847C15.7166 10.6381 16.862 11.7835 18.2117 12.6447L19.4342 13.4222C19.5315 13.4839 19.6117 13.5692 19.6672 13.6702C19.7228 13.7711 19.7519 13.8845 19.7519 13.9997C19.7519 14.115 19.7228 14.2283 19.6672 14.3293C19.6117 14.4302 19.5315 14.5155 19.4342 14.5772L18.2117 15.3547C16.862 16.2159 15.7166 17.3613 14.8555 18.711L14.078 19.9335C14.0163 20.0308 13.931 20.111 13.83 20.1665C13.729 20.222 13.6157 20.2511 13.5005 20.2511C13.3852 20.2511 13.2719 20.222 13.1709 20.1665C13.0699 20.111 12.9846 20.0308 12.923 19.9335L12.1455 18.711C11.2843 17.3613 10.1389 16.2159 8.7892 15.3547L7.5667 14.5772C7.46938 14.5155 7.38922 14.4302 7.33368 14.3293C7.27815 14.2283 7.24902 14.115 7.24902 13.9997C7.24902 13.8845 7.27815 13.7711 7.33368 13.6702C7.38922 13.5692 7.46938 13.4839 7.5667 13.4222L8.7892 12.6447C10.1389 11.7835 11.2843 10.6381 12.1455 9.28847L12.923 8.06597Z"
              stroke="#002DCB"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M13.5 26.5C20.4036 26.5 26 20.9036 26 14C26 7.09644 20.4036 1.5 13.5 1.5C6.59644 1.5 1 7.09644 1 14C1 20.9036 6.59644 26.5 13.5 26.5Z"
              stroke="#002DCB"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    case "yield-harvest":
      return (
        <div className={s.templateIconContainer}>
          <svg
            width="55"
            height="56"
            viewBox="0 0 55 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.3104 15.619C21.3104 15.619 23.1675 15 27.5008 15C31.8342 15 33.6913 15.619 33.6913 15.619M24.3096 21.898C25.3722 21.8347 26.4364 21.8052 27.5008 21.8095C28.825 21.8095 29.8693 21.8442 30.692 21.898M20.0723 33.5714C20.0723 35.5416 20.8549 37.4311 22.248 38.8242C23.6412 40.2174 25.5307 41 27.5008 41C29.471 41 31.3605 40.2174 32.7536 38.8242C34.1468 37.4311 34.9294 35.5416 34.9294 33.5714C34.9294 31.6012 34.1468 29.7118 32.7536 28.3186C31.3605 26.9255 29.471 26.1429 27.5008 26.1429C25.5307 26.1429 23.6412 26.9255 22.248 28.3186C20.8549 29.7118 20.0723 31.6012 20.0723 33.5714Z"
              stroke="#002DCB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.6731 26.1888C23.3761 20.5449 21.3103 15.6191 21.3103 15.6191C21.3103 15.6191 16.8841 18.4593 14.8599 22.8063C14.6122 23.3387 14.6859 23.9528 15.0177 24.4369C15.9129 25.7418 17.8969 28.5226 20.404 31.3665M34.5957 31.3665C37.1029 28.5232 39.0875 25.7418 39.9827 24.4369C40.3145 23.9528 40.3881 23.3387 40.1405 22.8063C38.1175 18.4593 33.6907 15.6191 33.6907 15.6191C33.6907 15.6191 31.6255 20.5449 28.3285 26.1888M26.8137 29.6344C26.8789 29.5084 26.9775 29.4028 27.0987 29.3291C27.2199 29.2554 27.359 29.2164 27.5008 29.2164C27.6427 29.2164 27.7818 29.2554 27.903 29.3291C28.0241 29.4028 28.1227 29.5084 28.188 29.6344L29.1227 31.437L31.116 31.8295C31.2502 31.856 31.375 31.9175 31.4776 32.0078C31.5803 32.0982 31.6572 32.2141 31.7005 32.3438C31.7438 32.4735 31.7519 32.6124 31.724 32.7463C31.6962 32.8802 31.6334 33.0043 31.542 33.106L30.1256 34.6815L30.385 36.7831C30.4022 36.922 30.3814 37.063 30.3248 37.191C30.2683 37.319 30.178 37.4293 30.0638 37.5101C29.9495 37.5909 29.8154 37.6392 29.6759 37.6499C29.5363 37.6605 29.3965 37.6331 29.2713 37.5706L27.5008 36.6866L25.7303 37.5706C25.6051 37.6333 25.4652 37.6608 25.3256 37.6502C25.1859 37.6397 25.0517 37.5914 24.9374 37.5106C24.823 37.4297 24.7327 37.3194 24.6761 37.1913C24.6195 37.0632 24.5988 36.9221 24.616 36.7831L24.876 34.6815L23.4597 33.106C23.3683 33.0043 23.3054 32.8802 23.2776 32.7463C23.2497 32.6124 23.2579 32.4735 23.3012 32.3438C23.3444 32.2141 23.4213 32.0982 23.524 32.0078C23.6266 31.9175 23.7514 31.856 23.8856 31.8295L25.8789 31.437L26.8137 29.6344Z"
              stroke="#002DCB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    case "custom":
      return (
        <div className={s.templateIconContainer}>
          <div className={s.gridIconWrapper}>
            <div className={s.gridSquare}></div>
            <div className={s.gridSquare}></div>
            <div className={s.gridSquare}></div>
            <div className={s.gridSquare}></div>
          </div>
        </div>
      );
    default:
      return (
        <div className={s.templateIconContainer}>
          <div className={s.gridIconWrapper}>
            <div className={s.gridSquare}></div>
            <div className={s.gridSquare}></div>
            <div className={s.gridSquare}></div>
            <div className={s.gridSquare}></div>
          </div>
        </div>
      );
  }
};

// Difficulty Dots Component
const DifficultyDots = ({ difficulty }: { difficulty: string }) => {
  const getDotCount = () => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return 1;
      case "intermediate":
        return 2;
      case "advanced":
        return 3;
      default:
        return 1;
    }
  };

  const activeDots = getDotCount();
  return (
    <div className={s.difficultyDots}>
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className={`${s.difficultyDot} ${
            dot <= activeDots ? s.active : s.inactive
          }`}
        />
      ))}
    </div>
  );
};

// Pre-built templates for common use cases
const TASK_TEMPLATES = [
  {
    id: "price-oracle",
    name: "Price Oracle",
    description: "Automatically update price feeds from external sources",
    icon: "📊",
    category: "DeFi",
    difficulty: "Beginner",
    estimatedCost: "~ 0.1 HLS/day",
    setupTime: "~ 90 sec",
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
    estimatedCost: "~ 0.2 HLS/day",
    setupTime: "~ 90 sec",
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
    description: "Automatically claim and compound rewards",
    icon: "🌾",
    category: "DeFi",
    difficulty: "Beginner",
    estimatedCost: "~ 0.15 HLS/day",
    setupTime: "~ 90 sec",
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
    description: "Automatically update price feeds from external sources",
    icon: "⚙️",
    category: "Custom",
    difficulty: "Advanced",
    estimatedCost: "~ Variable",
    setupTime: "~ Varies",
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
    const seconds = blockNum * 15; // ~15 seconds per block
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    return `${Math.round(seconds / 86400)} days`;
  };

  const getDurationInTime = (blocks: string) => {
    const blockNum = parseInt(blocks);
    const seconds = blockNum * 15;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    return `${Math.round(seconds / 86400)} days`;
  };

  const estimateDailyCost = () => {
    const blocksPerDay = 5760; // 24 hours * 60 minutes * 4 blocks per minute (15 seconds per block)
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
              >
                <div className={s.templateIcon}>
                  <TemplateIcon templateId={template.id} />
                </div>

                <div className={s.templateHeader}>
                  <h3 className={s.templateName}>{template.name}</h3>
                  <DifficultyDots difficulty={template.difficulty} />

                  <div className={s.templateTags}>
                    <span className={s.difficultyTag}>
                      {template.difficulty.toUpperCase()}
                    </span>
                    <span className={s.categoryTag}>{template.category}</span>
                  </div>
                </div>

                <p className={s.templateDescription}>{template.description}</p>

                <div className={s.templateFooter}>
                  <div className={s.templateStats}>
                    <div className={s.statItem}>
                      <span className={s.statLabel}>Est. Cost:</span>
                      <span className={s.statValue}>
                        {template.estimatedCost}
                      </span>
                    </div>
                    <div className={s.statItem}>
                      <span className={s.statLabel}>Setup:</span>
                      <span className={s.statValue}>{template.setupTime}</span>
                    </div>
                  </div>

                  <button
                    className={s.useTemplateButton}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className={s.helpSection}>
          <div className={s.helpGrid}>
            <div className={s.helpCard}>
              <div className={s.helpHeader}>
                <div className={s.helpIcon}>
                  <Image
                    src="/img/helper1.png"
                    alt="Beginner Friendly"
                    width={56}
                    height={56}
                  />
                </div>
                <h3>Beginner Friendly</h3>
              </div>
              <p>
                Start with pre-configured templates that include safe defaults
                and proven automation patterns.
              </p>
            </div>

            <div className={s.helpCard}>
              <div className={s.helpHeader}>
                <div className={s.helpIcon}>
                  <Image
                    src="/img/helper2.png"
                    alt="Battle Tested"
                    width={56}
                    height={56}
                  />
                </div>
                <h3>Battle Tested</h3>
              </div>
              <p>
                All templates are thoroughly tested and optimized for gas
                efficiency and reliability.
              </p>
            </div>

            <div className={s.helpCard}>
              <div className={s.helpHeader}>
                <div className={s.helpIcon}>
                  <Image
                    src="/img/helper3.png"
                    alt="Documentation"
                    width={56}
                    height={56}
                  />
                </div>
                <h3>Documentation</h3>
              </div>
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
            <h3 className={s.sectionTitle}>
              <span className={s.sectionIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Task Details
            </h3>

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
              <p className={s.hint}>
                Briefly describe the purpose so it’s easy to find later
              </p>
            </div>

            {selectedTemplate && (
              <div className={s.sectionMeta}>
                <span className={s.badge}>{selectedTemplate.category}</span>
                <span className={s.badge}>{selectedTemplate.difficulty}</span>
                {selectedTemplate.estimatedCost && (
                  <span className={s.badge}>
                    {selectedTemplate.estimatedCost}
                  </span>
                )}
                {selectedTemplate.setupTime && (
                  <span className={s.badge}>{selectedTemplate.setupTime}</span>
                )}
              </div>
            )}

            <div className={s.infoBox}>
              <ul className={s.tipList}>
                <li>Use a clear action verb, e.g. “Update price feed”</li>
                <li>
                  Match the name to the target function for quick scanning
                </li>
                <li>Descriptions support team/shared context</li>
              </ul>
            </div>
          </Card>

          <Card className={s.formSection}>
            <h3 className={s.sectionTitle}>
              <span className={s.sectionIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </span>
              Target Contract
            </h3>

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
            <h3 className={s.sectionTitle}>
              <span className={s.sectionIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </span>
              Timing & Duration
            </h3>

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

            <div className={s.infoBox}>
              <ul className={s.tipList}>
                <li>
                  <strong>Block Time:</strong> Helios produces blocks every ~15
                  seconds
                </li>
                <li>
                  <strong>Frequency:</strong> Lower numbers = more frequent
                  execution (higher costs)
                </li>
                <li>
                  <strong>Duration:</strong> Task automatically stops after the
                  specified blocks
                </li>
                <li>
                  <strong>Tip:</strong> Start with longer intervals to test,
                  then optimize for your needs
                </li>
              </ul>
            </div>
          </Card>

          <Card className={s.formSection}>
            <h3 className={s.sectionTitle}>
              <span className={s.sectionIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </span>
              Gas & Funding
            </h3>

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
