import type { CvData, ItemAction, SectionChange } from './types';
import { compareArrays, compareEntries, compareValues } from './utils';

// Compare basic CV title
export const compareCvTitle = (
  left: CvData,
  right: CvData
): SectionChange | null => {
  if (left.title === right.title) return null;

  return {
    section: 'Basic Information',
    items: [
      {
        name: 'CV Title',
        action: 'modified',
        fields: [compareValues('Title', left.title, right.title)!],
      },
    ],
  };
};

export const compareName = (
  left: CvData,
  right: CvData
): SectionChange | null => {
  if (left.name === right.name) return null;

  return {
    section: 'Basic Information',
    items: [
      {
        name: 'Name',
        action: 'modified',
        fields: [compareValues('Name', left.name, right.name)!],
      },
    ],
  };
};

export const compareAboutMe = (
  left: CvData,
  right: CvData
): SectionChange | null => {
  if (!left.aboutMe && !right.aboutMe) return null;

  const leftAbout = left.aboutMe;
  const rightAbout = right.aboutMe;

  const fields = [
    compareValues('Field', leftAbout?.fieldName, rightAbout?.fieldName),
    compareValues(
      'Description',
      leftAbout?.description,
      rightAbout?.description
    ),
  ].flatMap((x) => (x ? [x] : []));

  if (fields.length === 0) return null;

  const action: ItemAction =
    !leftAbout?.fieldName
      ? 'added'
      : !rightAbout?.fieldName
        ? 'removed'
        : 'modified';

  return {
    section: 'About Me',
    items: [
      {
        name: 'Personal Information',
        action,
        fields,
      },
    ],
  };
};


export const compareWorkExperience = (left: CvData, right: CvData) =>
  compareEntries(
    'Work Experience',
    left.workExperienceEntries,
    right.workExperienceEntries,
    (item) => `${item.name} - ${item.position}`,
    (leftItem, rightItem) => {
      if (!leftItem || !rightItem) {
        const action = !leftItem ? 'added' : 'removed';

        return [
          {
            label: 'Company',
            oldValue: leftItem?.name ?? null,
            newValue: rightItem?.name ?? null,
            action,
          },
          {
            label: 'Position',
            oldValue: leftItem?.position ?? null,
            newValue: rightItem?.position ?? null,
            action,
          },
          {
            label: 'Duration',
            oldValue: leftItem?.duration ?? null,
            newValue: rightItem?.duration ?? null,
            action,
          },
          {
            label: 'Location',
            oldValue: leftItem?.location ?? null,
            newValue: rightItem?.location ?? null,
            action,
          },
          {
            label: 'Description',
            oldValue: leftItem?.description ?? null,
            newValue: rightItem?.description ?? null,
            action,
          },
          {
            label: 'Skills',
            oldValue: leftItem?.skills?.join(', ') ?? null,
            newValue: rightItem?.skills?.join(', ') ?? null,
            action,
          },
        ];
      }

      return [
        compareValues('Company', leftItem.name, rightItem.name),
        compareValues('Position', leftItem.position, rightItem.position),
        compareValues('Duration', leftItem.duration, rightItem.duration),
        compareValues('Location', leftItem.location, rightItem.location),
        compareValues(
          'Description',
          leftItem.description,
          rightItem.description
        ),
        compareArrays('Skills', leftItem.skills, rightItem.skills),
      ].flatMap((x) => (x ? [x] : []));
    }
  );

// Compare Education
export const compareEducation = (left: CvData, right: CvData) =>
  compareEntries(
    'Education',
    left.educationEntries,
    right.educationEntries,
    (item) => `${item.name} - ${item.degree}`,
    (leftItem, rightItem) => {
      if (!leftItem || !rightItem) {
        const action = !leftItem ? 'added' : 'removed';

        return [
          {
            label: 'Institution',
            oldValue: leftItem?.name ?? null,
            newValue: rightItem?.name ?? null,
            action,
          },
          {
            label: 'Degree',
            oldValue: leftItem?.degree ?? null,
            newValue: rightItem?.degree ?? null,
            action,
          },
          {
            label: 'Duration',
            oldValue: leftItem?.duration ?? null,
            newValue: rightItem?.duration ?? null,
            action,
          },
          {
            label: 'Location',
            oldValue: leftItem?.location ?? null,
            newValue: rightItem?.location ?? null,
            action,
          },
          {
            label: 'Description',
            oldValue: leftItem?.description ?? null,
            newValue: rightItem?.description ?? null,
            action,
          },
          {
            label: 'Skills',
            oldValue: leftItem?.skills?.join(', ') ?? null,
            newValue: rightItem?.skills?.join(', ') ?? null,
            action,
          },
        ];
      }

      return [
        compareValues('Institution', leftItem.name, rightItem.name),
        compareValues('Degree', leftItem.degree, rightItem.degree),
        compareValues('Duration', leftItem.duration, rightItem.duration),
        compareValues('Location', leftItem.location, rightItem.location),
        compareValues(
          'Description',
          leftItem.description,
          rightItem.description
        ),
        compareArrays('Skills', leftItem.skills, rightItem.skills),
      ].flatMap((x) => (x ? [x] : []));
    }
  );

// Compare Projects
export const compareProjects = (left: CvData, right: CvData) =>
  compareEntries(
    'Projects',
    left.projectEntries,
    right.projectEntries,
    (item) => item.name,
    (leftItem, rightItem) => {
      if (!leftItem || !rightItem) {
        const action = !leftItem ? 'added' : 'removed';

        return [
          {
            label: 'Name',
            oldValue: leftItem?.name ?? null,
            newValue: rightItem?.name ?? null,
            action,
          },
          {
            label: 'Description',
            oldValue: leftItem?.description ?? null,
            newValue: rightItem?.description ?? null,
            action,
          },
          {
            label: 'Skills',
            oldValue: leftItem?.skills?.join(', ') ?? null,
            newValue: rightItem?.skills?.join(', ') ?? null,
            action,
          },
        ];
      }

      return [
        compareValues('Name', leftItem.name, rightItem.name),
        compareValues(
          'Description',
          leftItem.description,
          rightItem.description
        ),
        compareArrays('Skills', leftItem.skills, rightItem.skills),
      ].flatMap((x) => (x ? [x] : []));
    }
  );

// Compare Skills
export const compareSkills = (left: CvData, right: CvData) =>
  compareEntries(
    'Skills',
    left.skillEntries,
    right.skillEntries,
    (item) => item.category,
    (leftItem, rightItem) => {
      if (!leftItem || !rightItem) {
        const action = !leftItem ? 'added' : 'removed';

        return [
          {
            label: 'Category',
            oldValue: leftItem?.category ?? null,
            newValue: rightItem?.category ?? null,
            action,
          },
          {
            label: 'Skills',
            oldValue: leftItem?.skills.join(', ') ?? null,
            newValue: rightItem?.skills.join(', ') ?? null,
            action,
          },
        ];
      }

      return [
        compareValues('Category', leftItem.category, rightItem.category),
        compareArrays('Skills', leftItem.skills, rightItem.skills),
      ].flatMap((x) => (x ? [x] : []));
    }
  );

// Compare Contact Info
export const compareContactInfo = (left: CvData, right: CvData) =>
  compareEntries(
    'Contact Information',
    left.contactInfoEntries,
    right.contactInfoEntries,
    (item) => item.linkName,
    (leftItem, rightItem) => {
      if (!leftItem || !rightItem) {
        const action = !leftItem ? 'added' : 'removed';

        return [
          {
            label: 'Link Name',
            oldValue: leftItem?.linkName ?? null,
            newValue: rightItem?.linkName ?? null,
            action,
          },
          {
            label: 'Link',
            oldValue: leftItem?.link ?? null,
            newValue: rightItem?.link ?? null,
            action,
          },
        ];
      }

      return [
        compareValues('Link Name', leftItem.linkName, rightItem.linkName),
        compareValues('Link', leftItem.link, rightItem.link),
      ].flatMap((x) => (x ? [x] : []));
    }
  );
