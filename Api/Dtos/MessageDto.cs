using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Dtos
{
	public class MessageDto
	{
        [Required]
		public int id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        [Required]
        public string Content { get; set; }


    }
}

