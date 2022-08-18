import { selections } from './selections';

export const footNotes = {
  /**
   * Filter footnotes from input array that should not be shown based on their meta data.
   */
  filterAvailable(footnotes) {
    return footnotes.filter(this.shouldBeVisible);
  },

  shouldBeVisible(footnote, carrierData) {
    if (footnote.subjects_must_be_selected) {
      const selectedSubjects = footnote.subjects.filter((subject) =>
        selections.getShippingOptionValue(subject, null, carrierData?.code)
      );

      return selectedSubjects
        ? selectedSubjects.length === footnote.subjects.length
        : false;
    }
    if (footnote.subjects_must_be_available) {
      const availableSubjects = carrierData.service_options.filter(
        (shippingOption) => footnote.subjects.includes(shippingOption.code)
      );

      return availableSubjects
        ? availableSubjects.length === footnote.subjects.length
        : false;
    }

    return true;
  },
};
