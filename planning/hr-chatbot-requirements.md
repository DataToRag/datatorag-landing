# HR Chatbot Requirements

**Date:** 2025-11-05
**Source:** HR Team Meeting Transcript Analysis

## Problem Summary

The HR team currently has a ChatGPT-based solution ("People GPT") with critical issues:

- **Inconsistent accuracy**: Same question yields different answers (e.g., bereavement policy shows 5 days vs 3 days to different users)
- **Hallucinations**: Makes up information, pulls from internet despite instructions not to
- **Outdated data**: Remembers old documents even after removal
- **Model differences**: Desktop vs web versions give different results

## Desired Features

### Core Functionality

1. **HR Chatbot** for employees to ask FAQs without contacting HR directly
   - Benefits questions
   - Policy inquiries (bereavement, leave, etc.)
   - Sensitive/personal questions (miscarriage bereavement, etc.)
   - State-specific policy questions (Chicago, California addendums)

2. **Accuracy & Reliability**
   - Consistent answers across all users/platforms
   - Only pull from approved knowledge base (no internet)
   - Proper source citations showing which document provided the answer
   - Testing requirement: 10 people asking same questions should get identical correct answers

3. **Privacy & Security**
   - Confidential question handling
   - Anonymized usage tracking (question frequency, not who asked)
   - Clear communication to employees that queries are private

4. **Document Management & Control**
   - HR team can upload/update documents
   - Easy document replacement (benefits: end of year, policies: beginning of year)
   - Remove outdated documents completely
   - Sync with Google Drive knowledge base

5. **Slack Integration** (Preferred)
   - Slash command or direct chat access
   - Clear instructions to prevent accidental sharing in wrong channels
   - Better than separate web UI

6. **Alert System**
   - Notify HR when sensitive questions are asked (harassment, discrimination, etc.)
   - Even if anonymized, HR should know these topics are being raised

7. **Content Guardrails**
   - Block hate speech, sexual content
   - Handle inappropriate questions gracefully
   - Non-response to out-of-scope queries

8. **Analytics Dashboard**
   - Anonymized metrics on questions asked
   - Frequency tracking to identify common concerns
   - No individual user identification

## Action Items

### Immediate Priority

1. **Accuracy Fix**: Resolve hallucination and consistency issues
2. **Document Control Interface**: Give HR team ability to manage knowledge base
3. **Testing Protocol**: Implement 10-person same-question validation test

### Next Steps

4. **Slack Bot Development**: Build Slack-based interface with clear usage instructions
5. **Privacy Framework**: Ensure data stays internal, anonymize analytics
6. **Alert System**: Flag sensitive questions for HR team action
7. **Source Management**: Fix issue where old documents persist after removal
8. **Content Guardrails**: Implement inappropriate content filtering

### Long-term

9. **Document Update Process**: Quarterly/annual update workflow for benefits and policies
10. **Metrics Dashboard**: Build anonymized analytics for HR team

## Success Criteria

- ✅ 10 different users get identical, correct answers to same questions
- ✅ HR team comfortable with accuracy to push broadly to employees
- ✅ Privacy guarantees employees feel safe asking sensitive questions
- ✅ Easy document management for HR team
- ✅ Metrics show what employees are asking about

## Additional Key Details

### Current System Details

- **ChatGPT with Knowledge Base**: Currently using "People GPT" with uploaded documents
- **Limited Rollout**: Only 7 people using desktop version; included in team's out-of-office message but not actively promoted
- **User Experience Variance**: Some users (Lizzie, Viv) have no issues; others (Mark) consistently get wrong answers
- **Desktop vs Web Discrepancy**: Different ChatGPT models appear to be used between platforms

### Specific Pain Points

1. **Memory Persistence**: ChatGPT remembers old documents even after removal from knowledge base
2. **Source Confusion**: Pulls from internet despite explicit instructions not to (e.g., "Nene Tevo does five days")
3. **Contradictory Outputs**: Shows correct information on cited page but gives wrong answer in chat
4. **Model Lock-in**: Once it gives wrong answer, won't change unless explicitly corrected

### HR Team Constraints

- **Technical Limitations**: Team explicitly states they're "not technical enough" to manage complex systems
- **Response Time Goals**: Currently aim for 1 hour to 24-hour response time
- **Control Balance**: Want control over content but don't need/want "super technical control"

### Compliance Complexity

- **Multi-jurisdictional Policies**: Must handle national policy plus state/local requirements
  - Example: Chicago requires 3 days bereavement minimum, but company gives 5 nationally
  - Different requirements for child loss vs other family members
  - California and Chicago addendums exist but don't override national policy when national is more generous

### Employee Use Cases

- **Sensitive Personal Situations**: Miscarriage bereavement, personal medical situations
- **Embarrassing Questions**: Things employees don't feel comfortable asking HR directly
- **Quick Information Access**: Benefits info without waiting for HR response

### Testing & Validation Requirements

- **Consistency Test**: 10 people asking same questions must get identical correct answers
- **Cross-platform Validation**: Desktop and web versions must give same answers
- **Source Verification**: Ability to trace answers back to specific documents

### Privacy & Trust Concerns

- **Employee Confidence**: Must clearly communicate that queries are private
- **HR Visibility Balance**: HR wants anonymized metrics but not individual query tracking
- **Actionable Alerts**: Need to know when serious issues arise (harassment claims) without knowing who asked

### Document Management Specifics

- **Update Frequency**:
  - Benefits: End of year updates
  - Handbooks/Policies: Beginning of year updates
  - Occasional mid-year updates (e.g., sexual harassment policy wording)
- **Current Knowledge Base**: Mix of outdated and current documents in Google Drive
- **Version Control Issue**: System remembers old versions even after deletion

### Preferred Implementation

- **Slack Integration**: Strongly preferred over separate web interface
- **Simple Access**: Slash command or direct chat
- **Clear Instructions**: Prevent accidental bot inclusion in wrong channels

### Success Indicators

- **Accuracy First**: Won't promote widely until accuracy issues resolved
- **User Adoption**: Currently low usage due to trust issues
- **HR Efficiency**: Reduce repetitive FAQ workload

## Priority Matrix

### Critical (Blocking Deployment)

1. **Accuracy & Consistency**: Fix hallucination and conflicting answers
2. **Document Control**: Complete replacement of old documents
3. **Privacy Assurance**: Clear, demonstrable confidentiality

### High Priority (Core Functionality)

4. **Slack Integration**: Native chat experience
5. **Anonymized Analytics**: Question frequency tracking
6. **Alert System**: Flag sensitive issues for HR action

### Medium Priority (Enhanced Experience)

7. **Source Citation**: Show exact document/page references
8. **Multi-jurisdiction Handling**: Proper state/local policy layering
9. **User Instructions**: Clear guidance on proper usage

### Future Enhancements

10. **Automated Document Updates**: Scheduled refresh cycles
11. **Performance Metrics**: Response time tracking
12. **Feedback Loop**: User satisfaction measurement
