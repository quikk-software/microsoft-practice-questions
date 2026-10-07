---
title: "Create validation criteria for custom AI models"
url: "https://learn.microsoft.com/en-us/training/modules/manage-testing-ai-powered-business-solutions/3-create-validation-criteria-custom-ai-models"
uid: "learn.wwl.manage-testing-ai-powered-business-solutions.create-validation-criteria-custom-ai-models"
module: "manage-testing-ai-powered-business-solutions"
moduleTitle: "Manage testing AI-powered business solutions"
learningPath: "learn.wwl.architect-agentic-ai-business-solutions"
---
# Create validation criteria for custom AI models

## Overview

This unit teaches solution architects how to design robust validation criteria for custom AI models used in enterprise environments. You'll establish performance, quality, safety, and operational benchmarks to ensure that models behave predictably, meet business goals, align with compliance requirements, and operate effectively across changing data, workloads, and user interactions.

Validation criteria help architects consistently confirm that a model is:

*   Accurate and grounded in relevant data.
    
*   Reliable under varying operational conditions.
    
*   Safe and aligned with organizational guardrails.
    
*   Cost-efficient and scalable.
    
*   Evaluated consistently before, during, and after deployment.
    

## 1\. Foundations of model validation

Model validation establishes whether a custom AI model performs as expected and maintains consistent quality in production.

### Core questions for validation

*   _Does the model generate correct, relevant, grounded outputs?_
    
*   _Does performance remain stable under different workloads?_
    
*   _Can the model be trusted with sensitive or business-critical scenarios?_
    
*   _Is model behavior aligned with established business intent and expected outcomes?_
    

### Key validation dimensions

*   **Performance metrics**
    
*   **Quality and accuracy checks**
    
*   **Safety and compliance alignment**
    
*   **Cost and efficiency indicators**
    
*   **User-centric metrics**
    

## 2\. Define quantitative validation criteria

Quantitative criteria ensure measurable and repeatable evaluation during tuning or deployment.

### Primary metrics

Below are key metrics that must be included in the evaluation of custom AI Models.

*   **Accuracy Rate**  
    How often the model produces correct, expected, or acceptable outputs.
*   **Latency and Response Time**  
    Speed required for mission-critical workflows, ensuring no user-experience degradation.
*   **Throughput**  
    How many requests the model can process under peak loads.
*   **Error Rates**  
    Frequency of invalid responses, incomplete results, or workflow failures.
*   **Token Efficiency**  
    Amount of model usage cost relative to output quality.
*   **Drift Indicators**  
    Changes in output quality due to evolving data or shifting patterns.

## 3\. Define qualitative validation criteria

Qualitative evaluation helps architects identify nuanced issues that numeric metrics can't capture.

### Criteria examples

*   **Relevance and Completeness**  
    Does the model respond with the right level of detail, in context, without incorrect information?
*   **Consistency of Reasoning**  
    Does the model follow logical steps aligned with enterprise workflows?
*   **Grounding Integrity**  
    Does the model use approved organizational knowledge?
*   **User Experience Quality**  
    Clarity, coherence, readability, and instructional usefulness.

## 4\. Establish safety and compliance validation

Before production, custom models must satisfy enterprise governance requirements. Depending on the organization, there may be additional requirements. It's important to use the below as a neutral baseline.

### Key safety criteria

*   Enforces role-based access to restricted content.
    
*   Respects data loss prevention (DLP) policies.
    
*   Prevents generation of prohibited content types.
    
*   Maintains auditability and traceability of actions.
    

### Risk-mitigation requirements

*   Human-in-the-loop review for sensitive workflows.
    
*   Guardrail testing for disallowed instructions.
    
*   Verified grounding exclusively in authorized knowledge sources.
    

## 5\. Operational validation criteria

Operational validation ensures the model can be trusted in real systems.

### Areas to validate

*   **Scalability** - Stable behavior under varying compute and workload patterns.  
    **Resilience** - Recovery from errors, timeouts, or dependency interruptions.  
    **Integration Reliability** - Works consistently with APIs, connectors, or orchestration components.  
    **Monitoring Support** - Telemetry produced is adequate for observability and triage.

## 6\. Example validation metrics for custom models

Validation Area

Metric / Criteria

Success Threshold

Performance

Latency

< 2 seconds

Throughput

95th percentile stable

Quality

Accuracy

≥ 90% correctness

Incorrect Information Rate

≤ 3%

Safety

Guardrail Violations

0

Sensitive Output Detection

100% blocked

Cost Efficiency

Token Utilization

On par with baseline

User Experience

Satisfaction Score

≥ 4.5 / 5

## References

[Evaluate generative AI apps](/en-us/azure/ai-foundry/how-to/evaluate-generative-ai-app)
