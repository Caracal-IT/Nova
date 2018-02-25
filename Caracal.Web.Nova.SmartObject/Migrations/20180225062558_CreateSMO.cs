using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Caracal.Web.Nova.SmartObject.Migrations
{
    public partial class CreateSMO : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "smo");

            migrationBuilder.CreateTable(
                name: "SmartObjects",
                schema: "smo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    DefinitionStr = table.Column<string>(type: "jsonb", nullable: true),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Version = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SmartObjects", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SmartObjects",
                schema: "smo");
        }
    }
}
